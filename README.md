# Cupcake Central Test

## The Test

- Level: Mid-Senior	Submission
- Estimated Time: Within 48 hours  (2 - 6 Hours	Test Type)
- Wireframe link: https://xd.adobe.com/view/c71a2b8c-11f6-44cf-a614-4bef49b9c844-9249/  
- Wireframe link: https://xd.adobe.com/view/ac53c40a-4a95-48ab-9d9c-2e5484a4cde2-f900/ 

### 2. Task Requirements

Complete all the following requirements. Refer to the CCdev-test_2026 file for full context on the expected outcome.
 
#### Build your own dozen - cupcake box builders
- Create a Shopify product page called "Build Your Own Dozen"
- Fixed price (e.g. $72) - no variants required
- Display a grid of cupcake flavors with circular images and names
- Each flavor has - / quantity / + controls
- Live counter showing "X of 12" that updates in real time
- A 12-slot gift box preview that fills as cupcakes are selected
- Add-ons section (ribbon, candles, bag) below the box preview
- Add to Cart button disabled until exactly 12 cupcakes are selected
- Flavor selections passed to cart as Shopify line-item properties

#### Logic requirements
- + buttons must disable automatically when total reaches 12
- - buttons must disable individually when the flavor count is at 0
- Reset / start over clears all selections without a page reload
- No page reloads at any point - all state handled in JavaScript
 
#### Technical requirements
- Built using Shopify Liquid (theme section or template)
- Flavor data stored in metafields or metaobjects - not hardcoded HTML
- Vanilla JS only - Alpine.js is acceptable. No jQuery, Vue, or React
- No third-party apps (no Bold, Infinite Options, or similar)
- The number 12 must not be hardcoded - code should scale to 6 or 24
 
### 3. Required Output

Provide a clear output for each of the following when submitting your work.
 
1. A working Shopify preview link to the built page
2. Screenshots or a screen recording of the completed builder
3. GitHub repository links with your full theme code
4. A short written note explaining how you structured the flavor data
5. Any tradeoffs you made and the reason for each decision
 
### 4. Logical Questions

Answer each question in writing as part of your submission. There are no trick questions - we want to understand how you think.

### Q1 - State management

How did you manage the selection state (flavor counts, total, box preview) across the page?
Walk us through your approach and why you chose it.
 
### Q2 - Edge cases

Without being told, what edge cases did you identify and handle?
List them and explain how each one is handled in your code.
 

### Q3 - Shopify data structure

How did you store the cupcake flavor data in Shopify?
Why did you choose that approach (metafields, metaobjects, JSON, or other)?
 
### Q4 - Scalability

If the client wanted to change this to "Build Your Own 6" or "Build Your Own 24",
What would need to change in your code? How many minutes would that take?
 
### 5. Bonus Challenges (Optional)

These are not required but will be considered in the final score. Each bonus is worth 5 points.
 
####	Challenge	Points
1.	Drag and drop flavors into the 12-slot box on desktop	+5 pts
2.	Flavor limits driven by live Shopify inventory stock levels	+5 pts
3.	Selected add-ons passed to cart as line-item properties with correct pricing	+5 pts
4.	Selections persist on page refresh using local Storage	+5 pts

### 6. Scoring Rubric
 
|Category|What we look for|Points|
|---|---|---|
|Core functionality|Grid, counter, box preview, cart payload|30 pts|
|Edge case handling|Button locking, gated Add to Cart, reset|25 pts|
|Shopify structure|Liquid, metafields or metaobjects, scalable setup|20 pts|
|UX quality|Mobile responsive, no reloads, clear messaging|15 pts|
|Code quality|Readable, commented, 12 not hardcoded|10 pts|

- Pass mark: 60 / 100   
- Senior candidate target: 80+   
- Max with bonuses: 120

Good luck! If you have any questions about the brief, please reach out before starting.

We look forward to reviewing your work.
 
Cupcake Central Bakery - Developer Assessment
