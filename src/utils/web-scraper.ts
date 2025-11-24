import { Locator, Page } from "playwright";

export async function extractRawInnerTexts(page: Page): Promise<string[]> {
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

export async function scrapeTextsFromSelectors(
  page: Page,
  locators: Locator[]
): Promise<string[]> {
  const allTexts: string[] = [];

  // Function to check if an element has direct text content (not from children)
  const hasDirectText = (element: Element): boolean => {
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        return true;
      }
    }
    return false;
  };

  // Function to extract text from an element if it has direct text content
  const extractDirectTextIfExists = (element: Element): string | null => {
    let textContent = '';
    for (const node of element.childNodes) {
      if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
        textContent += ' ' + node.textContent.trim();
      }
    }
    return textContent.trim() || null;
  };

  // Function to process elements recursively
  const processElement = async (locator: Locator): Promise<void> => {
    try {
      const count = await locator.count();
      if (count === 0) return;

      for (let i = 0; i < count; i++) {
        const currentLocator = locator.nth(i);
        
        // Check if the current element has direct text
        const hasText = await currentLocator.evaluate(hasDirectText);
        
        if (hasText) {
          const text = await currentLocator.evaluate(extractDirectTextIfExists);
          if (text) {
            allTexts.push(text);
          }
        }

        // Process all direct children
        const childLocator = currentLocator.locator('> *');
        await processElement(childLocator);
      }
    } catch (error) {
      // Skip any errors and continue with next element
      return;
    }
  };

  // Process all provided locators
  for (const locator of locators) {
    await processElement(locator);
  }

  return allTexts;
}