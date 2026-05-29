# The Comfort Food Paradox - Data Visualization (COM-480)

| Student's name  | SCIPER |
| --------------- | ------ |
| Sofia Taouhid   | 339880 |
| Imane Benkamoun | 315906 |
| Quirin Bitter   | 423694 |

[Milestone 1](#milestone-1) • [Milestone 2](#milestone-2) • [Milestone 3](#milestone-3)

## 🌐 Live Project Links
* **Functional Prototype (Live Website):** [Click Here to View](https://69e22b6ade70a864d2e49a22--mellifluous-gingersnap-783835.netlify.app/)
* **Interactive Figma Design:** [Click Here to View](https://mint-atom-61616656.figma.site/)

---

## Milestone 1 (20th March, 5pm)

> [!NOTE]
> All code (`milestone1/code/`), data (`milestone1/datasets/`) and our report (`milestone1/report/`) for this milestone is at the folder `milestone1`. The report in PDF form is at `milestone1/report/main.pdf`.

### Dataset
Our project integrates four complementary datasets:
1. **Kaggle Recipes:** ~62,000 everyday dishes, enriched with an LLM-derived healthiness score.
2. **Flavor Network (Ahn et al.):** A bipartite dataset of 1,530 ingredients and 1,106 flavor compounds to calculate "flavor complexity."
3. **FooDB:** Filtered for specific neuro-active macro- and micronutrients (e.g., L-Tryptophan, Magnesium).
4. **UK Household Expenditures:** Time-series data tracking weekly per-person food spending from 1974 to 2024.

### Problematic
**The Comfort Food Paradox: Does pleasure come at the expense of health?**
We investigate the biological reality behind comfort food. We aim to deconstruct the assumption that healthy food is neurologically unrewarding and comfort food is purely a sensorial illusion. By plotting a "health axis" against a "pleasure axis," we want to help users find the culinary "Goldilocks Zone" that balances flavor, biology, and nutrition.

### Exploratory Data Analysis
During our EDA, we harmonized our disparate sources by bridging the Flavor Network and FooDB. Aligning row indices, standardizing names, and applying fuzzy matching successfully linked 315 core ingredients. We calculated ingredient "Flavor Complexity" (revealing a massive right-skewed distribution) and engineered a custom `mood_mapping.csv` to translate FooDB’s chemical data into categorical mood scores.

### Related Work
Our sensorial baseline builds on the 2011 *Nature Scientific Reports* paper by Ahn et al., *"Flavor network and the principles of food pairing."* Our approach is highly original because it links these isolated domains (flavor networks and nutritional databases). Visually, we draw inspiration from interactive data journalism pieces found on *The Pudding* and *FiveThirtyEight*.

---

## Milestone 2 (17th April, 5pm)

> [!NOTE]
> The website skeleton code (`milestone2/src`), the Figma sketch code (`milestone2/dataviz_project`) and our report (`milestone2/report/`) for this milestone are in the folder `milestone2`. The report in PDF form is at `milestone2/report/main.pdf`.

**Progress for this Milestone:**
* Deployed a live functional prototype using HTML/CSS/JS with a vertical-scrolling framework.
* Designed a complete UI/UX scrollytelling storyboard in Figma.
* Rebuilt our data pipeline in Python (pandas) to cleanly tokenize Kaggle ingredients, deduplicate recipes, and run a two-pass match against FlavorDB, resulting in 25,009 unique recipes carrying mood-relevant chemical profiles.

---

## Milestone 3 (29th May, 5pm)

### Website

Our websites code is in the `website` folder. To visit the website, start a webserver `python3 -m http.server` within the `website` directory and navigate to `http://0.0.0.0:8000` in your browser.

### Screencast

The screencast can be downloaded at <https://drive.google.com/file/d/1Tcpm7EfmM3vLcPgrJtsCQXWHdlFYpoMl/view?usp=sharing>.

### Process Book

The process book is at `process-book.pdf`.

---

## Late policy
- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone
