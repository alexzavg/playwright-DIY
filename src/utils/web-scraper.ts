import { Locator, Page } from "playwright";

async function extractRawInnerTexts(page: Page): Promise<string[]> {
  return await page.evaluate(() => {
    const texts: string[] = [];
    
    function hasDirectTextContent(element: Element): boolean {
      // Check if element has any direct text nodes (excluding whitespace-only nodes)
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent?.trim() || '';
          if (text.length > 0) {
            return true;
          }
        }
      }
      return false;
    }
    
    function getDirectTextContent(element: Element): string {
      let directText = '';
      
      // Collect text from direct text nodes only
      for (const node of element.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          directText += node.textContent || '';
        }
      }
      
      return directText.trim();
    }
    
    function traverse(element: Element): void {
      // If this element has direct text content, extract it
      if (hasDirectTextContent(element)) {
        const text = getDirectTextContent(element);
        if (text) {
          texts.push(text);
        }
      }
      
      // Recursively traverse child elements
      for (const child of element.children) {
        traverse(child);
      }
    }
    
    // Start traversal from document body
    traverse(document.body);
    
    return texts;
  });
}

async function scrapeTextsFromSelectors(
  page: Page,
  locators: Locator[]
): Promise<string[]> {
  const allTexts: string[] = [];

  // Step 1: Collect all matching elements from provided locators
  const allElements: Locator[] = [];
  
  for (const locator of locators) {
    try {
      const count = await locator.count();
      
      // If nothing is returned - continue the loop
      if (count === 0) {
        continue;
      }
      
      // For each returned locator - push them into array
      for (let i = 0; i < count; i++) {
        allElements.push(locator.nth(i));
      }
    } catch (error) {
      // If locator fails, continue to next one
      continue;
    }
  }

  // Step 2: Extract direct inner text from each collected element
  for (const element of allElements) {
    try {
      const text = await element.evaluate((el: Element) => {
        let directText = '';
        
        // Collect text from direct text nodes only (not from children)
        for (const node of el.childNodes) {
          if (node.nodeType === Node.TEXT_NODE) {
            directText += node.textContent || '';
          }
        }
        
        return directText.trim();
      });
      
      // If there's text - push to final array of strings
      if (text) {
        allTexts.push(text);
      }
    } catch (error) {
      // If element becomes stale or evaluation fails, skip it
      continue;
    }
  }

  return allTexts;
}

// Usage example:
// const texts = await scrapeTextsFromSelectors(page, [
//   page.locator('h1'),
//   page.locator('h2'),
//   page.locator('p'),
//   page.locator('a'),
//   page.locator('button'),
//   page.locator('span')
// ]);