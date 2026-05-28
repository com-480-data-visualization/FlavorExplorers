function initCategoryScatter() {
  const container = document.getElementById("viz-cat-scatter");
  if (!container) return;
  container.innerHTML = "";

  // Embedded data from milestone-3/viz/category-recipe-scatter/graph.js
  const csvdata = `category,avg_mood,avg_health,recipe_selection
Appetizers And Snacks,0.42804062499486534,0.31283017140687885,"Baked Cowboy Dip,Seven Layer Tex Mex Dip,Festive Olive and Cheese Appetizer"
Beef Recipes,0.505726245822174,0.4142456545983995,"Baked Veal Milanese,The Best Beef Tri-Tip,Bierocks (German Meat Turnovers)"
Vegetarian,0.5027269427615805,0.5021954779764553,"Miller's Marinara,Zucchini Corn and Tomato Pie,Grilled Coconut-Curry Tofu Kebabs"
Lasagna,0.5564441959529707,0.45356245637457593,"Classic and Simple Meat Lasagna,Chicken Cordon Bleu Lasagna,Creamy Potato Lasagna"
Meatloaf,0.48894825428215993,0.34012750898804506,"Mexican Meatloaf,Ranch Meatloaf,Slow Cooker Meatloaf"
Chili Recipes,0.6249755367408516,0.6274710685361322,"Paleo Chili,No-Bean Low-Carb Chili,Rotisserie Chicken Chili"
Desserts,0.19161329699151605,0.0949566084249561,"Easy S'Mores Bars,French Chocolate Mousse with Orange,Tembleque Puerto Rican Coconut Pudding"
Casseroles,0.4465098391953424,0.34492527744683255,"One Pot Tuna Casserole,Mashed Potato-Topped Turkey Pot Pie,Tuna Noodle Casserole II"
Macaroni And Cheese,0.37896209894756416,0.21082349336709816,"French Onion Mac and Cheese,Best Mac N Cheese Ever,Salmon Mac and Cheese"
Italian,0.48014449966049627,0.43160601529884135,"Chicken Pastina,Slow Cooker Vegetarian Minestrone,Grilled Prosciutto-Wrapped Peaches with Burrata and Basil"
Mushroom Soups,0.551665619217887,0.5556691251940763,"Creamed Broccoli and Mushroom Soup,Vegan Gluten-Free Mushroom Soup,Mushroom and Leek Soup"
Chowders,0.48684204059692004,0.45140783154328057,"Easy and Delicious Ham and Potato Soup,Dairy-Free Chowder,Quick and Hearty Corn Chowder"
Breakfast Potatoes,0.37284638438484596,0.2626366923674616,"Christmas Brunch Casserole,Slow Cooker Cheesy Hash Brown Potatoes,Breakfast Burrito with Potatoes and Chorizo"
Main Dishes,0.5010553331488439,0.4522048641797001,"Red Quinoa and Avocado Salad,Crispy Fried Chicken,Meaty Stuffed Pepper Casserole"
Mushrooms,0.5661662333275613,0.5231825421444724,"Vegan Lettuce Wraps,Pork Loin Roast with Baby Bellas,Chanterelle Risotto"
Comfort Food,0.39138240109647865,0.27134493299851004,"Slow Cooker Chicken Caesar Sandwiches,Broccoli Cheddar Mac and Cheese,Bacon Mushroom Swiss Meatloaf"
Leftovers,0.45833798422224414,0.37059294141217414,"Chicken Chimichangas,Chicken and Stuffing Casserole,Smoked Salmon Alfredo Sauce"
Camping Recipes,0.426964919259902,0.34529470030162074,"Sara's Beef Jerky,Homemade Chili Sauce,McKagen's Beef Jerky"
Chef John,0.46397830416691177,0.4443050299785631,"Red White and Blueberry Lemonade,Drumstick Sundae Jars,Spicy Potsticker Soup"
Noodle Casseroles,0.5107593101343102,0.32554614367114365,"6-Ingredient Ravioli Casserole,Chicken Spinach Alfredo Baked Stuffed Shells,Deluxe Ham Casserole"
Cheese Balls,0.5208515301570859,0.30736588000476894,"Creamy Goat Cheese and Honey,Aunt Rose's Cheese Ball,Salmon Cheese Ball"
Cheesecakes,0.12799152847152848,-0.10081401931401934,"No-Bake Cheesecake with Condensed Milk,PHILADELPHIA New York Cheesecake,Easy Peach Cheesecake"
Enchiladas,0.4630904953185249,0.4018152440716225,"Poblano Chile Enchiladas,Black Bean and Butternut Squash Enchilada Casserole,Angela's Awesome Chicken Enchiladas"
Ground Turkey,0.5694757195162607,0.5212043715412304,"Turkey Potato Casserole,Chili With Turkey and Beans,Sheet Pan Turkey Chili with Cornbread Dumplings"
Pork,0.49379077922751113,0.39651257488665814,"Ginger Pork and Vegetable Stir-fry,Bacon-Wrapped Chicken Skewers,Grilled Ham"
Breakfast Stratas,0.4799461451247166,0.31050736961451253,"Easy Strata and Variations,Sweet Bread Strata,Rita's Eggs Strata"
Dinner,0.5313003622721243,0.4628468602404487,"Cowboy Butter Swim Biscuits,Turkey and Quinoa Meatloaf,Slow Cooker Beef Stew"
Breakfast And Brunch,0.36170201289400294,0.31065550291616906,"Nutty Blueberry Oatmeal,Bananerberry Smoothie,Lela's Protein Mango Smoothie"
Chicken Cordon Bleu,0.38178120125488557,0.08722276261749946,"Weeknight Chicken Cordon Bleu,Chicken Cordon Bleu Sandwich,Easy Baked Chicken Cordon Bleu"
Chicken Parmesan,0.4840137234380932,0.3441620363763222,"Air Fryer Parmesan Chicken Bites,Cheese Lover's Chicken,Easy Parmesan-Crusted Chicken"
Ground Lamb,0.6158102880807991,0.5649356173582178,"Mediterranean Stuffed Zucchini,Margaret's Keftedes,Make-Ahead Moroccan Lamb Stew"
Cakes,0.14527692205809836,0.11270657606391346,"Healthier Bread Pudding II,Blueberry Bundt Cake,Gluten-Free Strawberry Shortcake"
New Year's,0.404242863123211,0.3297940639306078,"Texas Caviar with Avocado,Hot Chocolate,Eggless Sweet Potato Casserole"
Cooking For Two,0.5088667452947835,0.40307363520822764,"Tender Tomato Chicken Breasts,Sticky Garlic Pork Chops,Emergency Chicken"
Breakfast Casseroles,0.4162816664467608,0.2611858542400996,"Sausage Cranberry and Biscuit Breakfast Bake,Banana Cinnamon Roll Casserole,Canadian Bacon Breakfast Stack"
Lunch,0.5274858106081124,0.48690686161443025,"Easy Snack Wraps,Roasted Fall Vegetable Salad,California Club Chicken Wraps"
Pasta Carbonara,0.5518629434538523,0.37880304880304894,"Asparagus Carbonara,Chicken and Shrimp Carbonara,Greek Yogurt Carbonara"
Lamb,0.616301789691864,0.6074491532210261,"Lancashire Hot Pot,Stuffed Greek Leg of Lamb,Chef John's Grilled Lamb Steaks"
Halloween,0.22122758414425073,0.13586655594807764,"Killer Pumpkin Pie,Halloween Chocolate Cupcakes with Monster Peanut Butter Eyes,Pretzel Broomstick"
Ziti,0.5561083032669167,0.4182969924566563,"Red Pepper Tomato Pasta Bake,Ziti with Roasted Zucchini and Garlic,Slow Cooker Baked Ziti"
Nachos,0.41848050450126567,0.28117954197538975,"Awesome Irish Nachos,Tater Tots Nachos,Beefy Lasagna Nachos"
Mexican,0.4649378710941425,0.45074391931903923,"Yummy Chicken Burritos,Mexican Sour Cream Rice,Slow Cooker Salsa Chicken"
Meatballs,0.4949106776710942,0.37590037651618535,"Danish Meatballs with Dill Sauce,Easy Homemade Meatballs,Grandma's Authentic Swedish Meatballs"
Winter Squash,0.5664400145269094,0.5274387453822674,"Spaghetti Squash Lasagna,Roasted Delicata Squash with Hot Honey,Easy Spaghetti Squash Spaghetti"
Gumbos,0.5403904831279831,0.5206114456449984,"Instant Pot Chicken and Sausage Gumbo,Healthier Slow Cooker Gumbo,Shrimp Gumbo"
Mardi Gras,0.4161288861060539,0.3602265292090085,"Chef John's Bananas Foster,Pralines II,Cajun Pork Chops"
Cooking For A Crowd,0.38640015640702824,0.27862953581755123,"Easy Roasted Vegetables,Quick and Easy Burrito Casserole,Easy Chocolate Chip Cookie Dough Cheesecake"
Pies,0.08954358733951047,-0.005505027750464984,"Tieton Apricot Tart with Basil Custard,Fudgy Chocolate Cream Pie,Key Lime and Raspberry Pies in Jars"
Ground Chicken,0.5664986573141653,0.500506558207093,"Chicken Spaghetti Sauce,Baked Chicken Burger,Chicken Cheesesteak"
Picnic Recipes,0.4415071709972399,0.3625414732008506,"Buffalo Chicken Tater Tot Casserole,Hot Honey Butter Cream Cheese Stuffed Bagel,Hawaiian Bruddah Potato Mac Salad"
Dumplings,0.36255597437110026,0.3141609429319513,"Gnocchi,Slow Cooker Creamy Chicken and Dumplings,Beginner Chicken and Dumplings"
Chiles Rellenos,0.45407338693052984,0.3819233147804577,"Chile Relleno Pancakes,Chile Relleno Casserole,Baked Beef Chiles Rellenos Casserole"
Easter,0.37846148475202734,0.3017438327119087,"Rita's Sweet Holiday Baked Ham,Easy Cucumber Party Sandwiches,Pani Popo"
Healthy Recipes,0.4778214263437902,0.4978763840184394,"Healthier Italian Spaghetti Sauce with Meatballs,Cabbage Apple Soup,Middle Eastern Rice with Black Beans and Chickpeas"
Beef Stews,0.5033248057050403,0.4989092953558492,"Red Wine-Marinated Beef Stew,Oven-Baked Beef Stew,French Onion Beef and Noodles"
Pizza,0.427818576736198,0.33832011547621976,"Mel's Brown Pizza Sauce,Italian Pizza Crust in Bread Machine,Bacon Buffalo Chicken Pizza"
Cabbage Rolls,0.52533433960573,0.5243590403951367,"Ukrainian Beet Green Cabbage Rolls,Easy Cabbage Roll Casserole,Deconstructed Cabbage Roll Casserole"
Ground Beef,0.5057385409030296,0.4208129592386499,"Baked Cream Cheese Spaghetti Casserole,Neat Sloppy Joes,Slow Cooker Jackfruit Joes"
Paella,0.6364539206370807,0.6667412693822469,"North African Paella,Vegan Paella,Cascadia Fideua"
Korean,0.5364013107545639,0.5397010127686851,"Spicy Korean Ribs,Kimchi Jun and Dipping Sauce,Korean Hot Wings"
Manicotti,0.4854548637636873,0.35798032849503436,"Manicotti Alla Romana,Meat Filled Manicotti,Chicken Manicotti Alfredo"
Yeast Breads,0.16413653040553244,0.2788679044511827,"Gluten-Free Sourdough Starter,Pizza Crust I,Angel Biscuit Rolls"
Christmas,0.27167609567405954,0.1721030037835467,"Cranberry Pecan Salad,Broccoli Cashew Salad,Baked Brie in Puff Pastry"
Buffalo Chicken Dips,0.30130952380952375,-0.09281462585034013,"Buffalo Ranch Chicken and Cheese Dip,Cold Buffalo Chicken Dip,Vegetarian Buffalo Chicken Dip"
Burgers,0.5110773049846239,0.3737321757636397,"Indoor Chicken Burgers on Biscuits,Cream Cheese-Jalapeno Hamburgers,Hawaiian Roast Beef Sliders"
Fettuccini,0.5215245158938598,0.36617635914864416,"Creamy Asparagus and Mushroom Pasta,Shrimp and Asparagus Fettuccine,Homemade Chicken Fettuccine"
Gnocchi,0.5351078551078551,0.4212989127274841,"Pasta with Gorgonzola Sauce and Radicchio,Mushroom Spinach Gnocchi with Creamy Boursin Sauce,Rossi's Sausage Gnocchi"
Diabetic,0.5655652577241588,0.6515569719682336,"Island Chicken with Fruit Salsa,Summer Bean Salad II,No Bake Bumpy Peanut Butter Nuggets"
Hanukkah,0.29813722157472156,0.21958563234604897,"Harvest Noodle Pudding Fruit Kugel,Potato Latkes from Simply Potatoes,Potato Kugel"
Breads,0.20491030497401572,0.2513349871725023,"Bavarian Pretzels,Bread Machine Monkey Bread,Schlotsky's Bread"
Artichoke Dips,0.5560343467901607,0.3383087519715427,"Super Easy Dip for Artichokes or Asparagus,Skinny Spinach and Artichoke Dip,Vegan Spinach Artichoke Dip"
Minestrone Soups,0.6287874719434983,0.668606689918743,"Sweet Potato Minestrone,Classic Minestrone,Instant Pot Buckwheat Minestra"
Buffalo Chicken Wings,0.3893587263800031,0.16684469195107499,"Buffalo Chicken Wraps,Copycat Cheesecake Factory Buffalo Blasts,Buffalo-Style Chicken Pizza"
Chilaquiles,0.39735591080613697,0.30251087022580236,"Easy Microwave Chilaquiles,Chilaquiles Scramble,Chicken Chilaquiles"
Chicken Noodle Soups,0.5504616883661,0.5595446791770321,"Creamy Buffalo Chicken Noodle Soup,Chicken in Lemongrass Coconut Broth,Cold-Busting Ginger Chicken Noodle Soup"
Omelets,0.5480155893489227,0.43923365215031895,"Keto Buffalo Chicken Omelette,Fresh Apple Omelet,Zucchini Scallion Frittata Cups"
Beef Stroganoff,0.42104363056234717,0.22364474231452838,"Hybrid Hamburger Stroganoff,Marlene's Beef Stroganoff,Easy Beef Stroganoff in the Slow Cooker"
Chicken Marsala,0.45954854017570274,0.4051101234405733,"Chicken with a Creamy Marsala Sauce,Instant Pot Easy Chicken Marsala,Chicken Marsala Over White Rice"
High Fiber,0.49289655774333213,0.5528865925609285,"Better Baked Beans,Microwave Popcorn,French Orange Poached Pears"
Fajitas,0.5669089279921415,0.5288462169505928,"Colorful Vegetable Fajitas,Chicken Fajita Tacos,Pollo Fajitas"
Low Fat,0.4244638228045307,0.4879698055140532,"Orange Sponge Cake,Gizzard Stew,Mint Chutney"
Antipasti,0.5948559002725671,0.5191754850088183,"Air Fryer Pasta Tacos,Italian Tuna Spread,Marinated Feta"
Eggplant Parmesan,0.4931911878970703,0.4565964509346863,"Italian Eggplant Parmigiana,Eggplant Parmesan I,Eggplant Parmesan Bites"
Make-Ahead,0.5276255571305786,0.48124177651616673,"Freezer-Friendly Frittata,Make-Ahead Sweet Potato and Chorizo Breakfast Burritos,Stuffed Shells IV"
Borscht,0.5165206525500643,0.5753921160538807,"Omi's Borscht,Sweet and Sour Borscht Shooters,Cabbage Borscht Mennonite Soup"
Hawaiian,0.32903387485530355,0.3774142841285698,"Deconstructed Spam Musubi,Hawaiian Beach Shrimp,Hawaiian Coleslaw"
Indian,0.48485979008311,0.5511323177399863,"Mango-Pineapple Chutney,Whole Wheat Chapati,Naan Bread"
Fruit Salads,0.41052375992336604,0.45733093240967254,"Mandarin Orange Watergate Salad,Cantaloupe Dressing,Fun Finger Gelatin"
French Onion Soups,0.5275842249855408,0.3886795815660947,"Restaurant-Style French Onion Soup,French Onion Soup VII,French Onion Soup I"
Pasta Salads,0.5178648643383816,0.4662483254659965,"Shrimp Couscous Salad,Mandarin Chicken Pasta Salad,Lemony Dill Salmon Pasta Salad"
Butternut Squash Soups,0.6177839616253358,0.6198926514789088,"Roasted Butternut Squash Soup with Apples and Bacon,Best Butternut Squash Soup Ever"
Cupcakes,0.12680645577967006,0.05070995142423715,"Cinnabon Cupcakes,Chocolate-Orange Cupcakes with Pistachio Buttercream,Vegan Chocolate Cupcakes with Vanilla Frosting"
Pad Thai,0.46795876742305315,0.5135600644686779,"Okinawan-Style Pad Thai,Zucchini Noodles Pad Thai,Chicken Pad Thai with Peanut Sauce"
Instant Pot,0.5242184401671355,0.5479231409776523,"Instant Pot Hawaii-Style Shoyu Chicken Drumsticks,Instant Pot Pork Stew,Instant Pot Pasta with Italian Sausage"
Breakfast Burritos,0.4132142857142857,0.31186904761904766,"Migas con Chorizo,Spinach Feta Egg Wrap,Make-Ahead Freezer Breakfast Burritos"
Gluten-Free,0.423676772788615,0.3931881294874716,"Herbed Mushrooms with White Wine,Early Morning Oven Roasted New Potatoes,Green Grape Salad"
Granola,0.5686945320570189,0.6064385751465214,"Sweet Nut and Seed Granola,Paleo Granola,Mom's Best Granola"
Low Calorie,0.4808098505172568,0.47750643401435844,"Shrimp Salsa,One-Dish Rockfish,Mango Sorbet"
Green Salads,0.5431271572343002,0.5533755567939237,"Our Favorite Balsamic Vinaigrette,Strawberry Romaine Summer Salad,Easy Strawberry Vinaigrette"
Cocktails,0.16116303827785414,-0.009925386595545597,"Passion Fruit Margarita,Gene's Long Island Iced Tea,Vampiros Mexicanos"
Polenta,0.46585452393627125,0.5449350872599141,"Air Fryer Polenta Fries,Vegan Polenta with Ragu,Chef John's Three Corn Polenta"
Mashed Potatoes,0.46195471521942116,0.33968131419234365,"Creamy Mashed Sweet Potatoes,Mascarpone Mashed Potatoes,Loaded Mashed Potatoes"
Pasta Primavera,0.619163070685562,0.6059043642823921,"Creamy Shrimp Pasta Primavera,Lemon Orzo Primavera,Creamy Pasta Primavera with Chicken and Sausage"
Chicken Cacciatore,0.5731782328782329,0.6029348817848819,"Boneless Chicken Cacciatore,Chicken Cacciatore II,Northern Italian-Style Chicken Cacciatore"
Jewish,0.3828314779356445,0.37907889178722526,"Hamantashen II,Baked Acorn Squash,Homemade Chicken Soup"
Jalapeno Poppers,0.47304870129870136,0.13289862914862913,"Baked Bacon Jalapeno Wraps,Spicy Jalapeno Bites,Stuffed Jalapenos"
Banana Breads,0.22244518510713307,0.2525153747959907,"Banana Cream Cheesecake,Vegan Banana Cake,Delicious Vegan Spelt Muffins"
Baked Beans,0.5079961418698261,0.36393620414673045,"3BC Best Baked Bean Casserole,Western-Style Baked Beans,Bourbon Baked Beans"
Burritos,0.5285570387828792,0.4257711015641688,"Korean Fusion Chicken Burrito,Easy One-Skillet Ground Beef Burrito,Steak Burrito"
Lentil Soups,0.6771031048394494,0.7375117681105078,"Bryan's Spicy Red Lentil Soup,Lentil Curry Soup,Spicy Tomato and Lentil Soup"
Keto,0.49193121693121705,0.30009920634920634,"Keto Air Fryer Jalapeno Poppers,Keto Ice Cream,Turkish Eggs"
Linguine,0.6034596066819251,0.5320976830103128,"Garlic Shrimp Linguine,Linguine with Peppers and Sausage,Shrimp Scampi with Pasta"
Pancakes,0.24609111342408355,0.2908231361889675,"Banana and Peanut Butter Pancakes,German Apple Pancake"
Air Fryer Recipes,0.4951737070119422,0.39796164561395647,"Air Fryer Naked Chicken Tenders,Air Fryer Lemon-Thyme Baby Red Potatoes,TikTok's Air Fryer Pizza"
Overnight Oats,0.6107647907647908,0.7213771645021644,"Overnight Buckwheat Oats,Spicy Gingerbread Overnight Oats,Pumpkin Pie Overnight Oats"
Energy Balls,0.6528822790113114,0.6984785062607644,"Gluten-Free Fried Oatmeal Bites,Chocolate-Cranberry Energy Bars,Peanut Butter Protein Balls"
Chicken Salads,0.538567350487531,0.4699975008258141,"Mediterranean Chicken and Orzo Salad In Red Pepper Cups,Simply The Best Chicken Waldorf Salad,Curry Chicken Salad with Grapes"
Goulash,0.5230684246309246,0.4047377622377623,"Cuban Goulash,Mom's Goulash,Newfie Goulash"
Beef Tenderloin,0.5668150706131475,0.4434486613813538,"Louise's Herbed Beef Tenderloin,Confit Olive Oil Steak,Chicken Fried Steak with Cream Pork Sausage Gravy"
Fries,0.3689565796857463,0.30981103194644855,"Low Carb Zucchini Fries,Curried Cottage Fries,French Fried Potatoes"
Flank Steak,0.5628254038702954,0.5394069088805931,"Stuffed Flank Steak,Braised Flank Steak in the Oven,Grilled Mexican Steak"
Fried Chicken,0.33411657786657784,0.2488253933566434,"Air Fryer Cornflake Chicken Fingers,Southern Fried Chicken,Dooky Chase-Style Fried Chicken"
Ceviche,0.6662000499500501,0.6859982725607725,"Basic Ceviche,Javi's Really Real Mexican Ceviche,Shiitake Mushroom Ceviche"
Lentil Soups,0.6771031048394494,0.7375117681105078,"Bryan's Spicy Red Lentil Soup,Lentil Curry Soup,Spicy Tomato and Lentil Soup"
Whole30,0.6233046398046398,0.6546228632478633,"Baked Fresh Rainbow Trout,Pinakbet,Stove Top Pot Roast"
Falafel,0.5296536796536796,0.5832743014561197,"Waffled Falafel,Air Fryer Falafel Gluten Free,Spicy Baked Falafel with Tzatziki"
Hummus,0.6648563064842137,0.7449711657851192,"Easy Black Bean Hummus,Joe's Hummus with Pine Nuts,Decadent Hummus"
Guacamole,0.6880967570441255,0.7260210184552292,"Avocado and Black Bean Dip,Spicy Guacamole with Chipotle,Asparagus Guacamole"
Mediterranean Diet,0.644448599645968,0.6779469835719836,"Broiled Spanish Mackerel,Garlic and Herb Marinade,Greek Chicken Pasta"
Paleo,0.6152690631468205,0.6553713548502154,"Whipped Banana Ice Cream,Basic Broiled Chicken Breasts,Tuna and Avocado Salad"
Pestos,0.6835372280780443,0.6616577583414318,"Cilantro Jalapeno Pesto with Lime,Parmesan Pesto Roasted Cauliflower,Pesto-Crusted Grouper"
Oatmeal,0.5684356962481962,0.6162453778860029,"Baked Cranberry Oatmeal,Protein Powder Overnight Oats with Blueberries and Peanut Butter,Baked Oatmeal"
Gazpacho,0.6006513047138048,0.6966719276094276,"Shrimp Gazpacho,Summer Watermelon Gazpacho,Mexican Gazpacho"
Jambalayas,0.5912962962962962,0.5494444444444445,"Low Carb Jambalaya,Cabbage Jambalaya,Instant Pot Cajun Jambalaya"
Flat Iron Steak,0.6520321558783095,0.6322178889486582,"Drunken Flat Iron Steak,Flat Iron Steak Grilled to a Tea,Grilled Gorgonzola Flat Irons"
Lettuce Wraps,0.6027377936820661,0.6194765378240611,"Asian Roll Lettuce Wrap,Thai Lettuce Cups with Red Curry Potatoes,One-Bite Thai Flavor Bomb Salad Wraps"
Coleslaws,0.44990237703472985,0.45938084791025957,"Japanese-Style Cabbage Salad,Fruited Coleslaw,Red Cabbage and Celery Root Coleslaw with Apple Cider Dressing"
Gyros,0.5830615773115773,0.668458041958042,"Grilled Gyro Burgers,Venison Gyros,Gyros"
Frittatas,0.5628675898390441,0.5028095034116444,"Paleo Omelet Muffins,Nan's Potato and Egg Frittata,Baked Omelet"
Chicken Piccata,0.47889742735896584,0.47474239435777893,"Chicken Piccata II,Oven-Baked Chicken Piccata Recipe,My Best Chicken Piccata"
Fried Rice,0.5247439708623919,0.5253732551429917,"Pineapple Shrimp Fried Rice,Stir-Fried Rice,Pineapple Fried Rice with Ham"
Bulgogi,0.508043623043623,0.5042324342324342,"Dak Bulgogi Korean Barbeque Chicken,Beef Bulgogi with Dipping Sauce,Bulgogi Korean Barbecued Beef"
Low Sodium,0.5602711133143605,0.5876053518956965,"Mandarin Almond Salad,Poached Salmon,Perfect Grilled Zucchini"
Jell-O Shots,-0.13416666666666668,-0.19826797385620917,"Baileys and Coffee Jell-O Shots,Strawberry Cheesecake Jell-O Shots,Top Shelf Sparkling Margarita Jell-O"
Lemon Bars,-0.07039862914862914,-0.19699925074925073,"Lemon Curd Bars,Lemon Bar Peeps,Luscious Lemon Triangles"
Chocolate Fudge,0.2247312925170068,-0.0629331065759637,"Chocolate Walnut Fudge,Black Bottom Butterscotch Fudge,Dark Chocolate Peppermint Fudge Recipe"
Mincemeat Pie,0.02261904761904761,-0.11785714285714284,"Classic Mincemeat Pie,Homemade Mince Pie with Crumbly Topping,Traditional Mince Pies"
Creme Brulee,0.1082581453634085,-0.09731943495101389,"Keto Creme Brulee,Cali's Sinful Creme Brulee,Chai Latte Creme Brulee"
Pie Crusts,0.11780375180375179,-0.025367965367965362,"Crumb Topping for Pies,Rich Shortcrust Pastry,Vanilla Wafer Crust"
Key Lime Pie,0.09563492063492064,-0.03472222222222221,"Classic Key Lime Pie,Key Lime Pie - Low Carb Version,Key Lime and Pretzel Pie"
Cherry Pie,0.05750257678829105,0.01859779770494058,"Mock Cheese Cake Pie,Skillet Cherry Cobbler Gluten-Free,Cajun Sweet Dough"
Biscuits,-0.06811355311355312,-0.032083333333333325,"Sour Cream Biscuits,Basic Biscuits,Super Easy Shortcake Biscuits"
Whoopie Pies,-0.017875724153297686,-0.009527271135727017,"Let's Make Whoopie Pies,Neapolitan Whoopie Pies,Cake Mix Whoopie Pies"
Doughnuts,-0.01951101808244665,0.007808302808302829,"Easy Funnel Cakes,Banana Fritters,Struffoli"`;

  const data = d3.csvParse(csvdata.trim());

  const m = { top: 40, right: 20, bottom: 48, l: 48 };
  const W = 420, H = 310;

  const svg = d3.select("#viz-cat-scatter")
    .append("svg")
    .attr("viewBox", `0 0 ${W} ${H}`)
    .style("width", "100%").style("height", "100%");

  const tooltip = d3.select(".tooltip");

  const xExt = d3.extent(data, d => +d.avg_mood);
  const yExt = d3.extent(data, d => +d.avg_health);

  const x = d3.scaleLinear()
    .domain([Math.min(xExt[0], -0.25), Math.max(xExt[1], 0.75)])
    .range([m.l, W - m.right]);
  const y = d3.scaleLinear()
    .domain([Math.min(yExt[0], -0.25), Math.max(yExt[1], 0.8)])
    .range([H - m.bottom, m.top]);

  // Colour by health score (RdYlGn like the original)
  const colorScale = d => d3.interpolateRdYlGn((+d.avg_health + 0.25) / 1.05);

  // Zero-reference lines
  svg.append("line").attr("x1", x(0)).attr("x2", x(0)).attr("y1", m.top).attr("y2", H - m.bottom)
    .attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", "3,3");
  svg.append("line").attr("x1", m.l).attr("x2", W - m.right).attr("y1", y(0)).attr("y2", y(0))
    .attr("stroke", "#ddd").attr("stroke-width", 1).attr("stroke-dasharray", "3,3");

  // Axes
  svg.append("g").attr("transform", `translate(0,${H - m.bottom})`)
    .call(d3.axisBottom(x).ticks(5)).attr("font-size", 8);
  svg.append("g").attr("transform", `translate(${m.l},0)`)
    .call(d3.axisLeft(y).ticks(5)).attr("font-size", 8);

  // Axis labels
  svg.append("text").attr("x", W / 2).attr("y", H - 4)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#999")
    .text("← worse mood · Mood Score · better mood →");
  svg.append("text").attr("transform", "rotate(-90)")
    .attr("x", -(H / 2)).attr("y", 13)
    .attr("text-anchor", "middle").attr("font-size", 9).attr("fill", "#999")
    .text("Health Score →");

  // Dots
  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => x(+d.avg_mood))
    .attr("cy", d => y(+d.avg_health))
    .attr("r", 4.5)
    .attr("fill", colorScale)
    .attr("opacity", 0.78)
    .attr("stroke", "white").attr("stroke-width", 0.6)
    .on("mouseover", function () { d3.select(this).attr("r", 7).attr("opacity", 1); })
    .on("mousemove", (event, d) => {
      tooltip
        .html(`<strong>${d.category}</strong><br>${d.recipe_selection.split(",")[0]}`)
        .style("opacity", 1)
        .style("left", (event.pageX + 12) + "px")
        .style("top",  (event.pageY - 44) + "px");
    })
    .on("mouseleave", function () {
      d3.select(this).attr("r", 4.5).attr("opacity", 0.78);
      tooltip.style("opacity", 0);
    });

  // Colour legend (health axis)
  const lg = svg.append("g").attr("transform", `translate(${W / 6}, ${m.top})`);
  const defs = svg.append("defs");
  const grad = defs.append("linearGradient").attr("id", "cat-sc-grad").attr("x1","0%").attr("x2","0%").attr("y1","100%").attr("y2","0%");
  [0, 0.25, 0.5, 0.75, 1].forEach(t => {
    grad.append("stop").attr("offset", `${t * 100}%`)
      .attr("stop-color", d3.interpolateRdYlGn(t));
  });
  lg.append("rect").attr("width", 8).attr("height", 50).attr("fill", "url(#cat-sc-grad)").attr("rx", 2);
  lg.append("text").attr("x", 11).attr("y", 6).attr("font-size", 7).attr("fill", "#888").text("healthy");
  lg.append("text").attr("x", 11).attr("y", 52).attr("font-size", 7).attr("fill", "#888").text("unhealthy");
}
