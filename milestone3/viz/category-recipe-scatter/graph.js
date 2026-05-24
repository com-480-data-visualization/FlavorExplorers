const csvdata = `
category,avg_mood,avg_health,recipe_selection
Appetizers And Snacks,0.42804062499486534,0.31283017140687885,"Baked Cowboy Dip,Seven Layer Tex Mex Dip,Festive Olive and Cheese Appetizer"
Beef Recipes,0.505726245822174,0.4142456545983995,"Baked Veal Milanese,The Best Beef Tri-Tip,Bierocks (German Meat Turnovers)"
Vegetarian,0.5027269427615805,0.5021954779764553,"Miller's Marinara,Zucchini, Corn, and Tomato Pie,Grilled Coconut-Curry Tofu Kebabs"
Lasagna,0.5564441959529707,0.45356245637457593,"Classic and Simple Meat Lasagna,Chicken Cordon Bleu Lasagna,Creamy Potato Lasagna"
Meatloaf,0.48894825428215993,0.34012750898804506,"Mexican Meatloaf,Ranch Meatloaf,Slow Cooker Meatloaf"
Chili Recipes,0.6249755367408516,0.6274710685361322,"Paleo Chili,No-Bean Low-Carb Chili,Rotisserie Chicken Chili"
Desserts,0.19161329699151605,0.0949566084249561,"Easy S'Mores Bars,French Chocolate Mousse with Orange,Tembleque Puerto Rican Coconut Pudding"
Casseroles,0.4465098391953424,0.34492527744683255,"One Pot Tuna Casserole,Mashed Potato-Topped Turkey Pot Pie,Tuna Noodle Casserole II"
Macaroni And Cheese,0.37896209894756416,0.21082349336709816,"French Onion Mac and Cheese,Best Mac 'N Cheese Ever!,Salmon Mac and Cheese"
Italian,0.48014449966049627,0.43160601529884135,"Chicken Pastina,Slow Cooker Vegetarian Minestrone,Grilled Prosciutto-Wrapped Peaches with Burrata and Basil"
Mushroom Soups,0.551665619217887,0.5556691251940763,"Creamed Broccoli and Mushroom Soup,Vegan Gluten-Free Mushroom Soup,Mushroom and Leek Soup"
Chowders,0.48684204059692004,0.45140783154328057,"Easy and Delicious Ham and Potato Soup,Dairy-Free Chowder,Quick and Hearty Corn Chowder"
Breakfast Potatoes,0.37284638438484596,0.2626366923674616,"Christmas Brunch Casserole,Slow Cooker Cheesy Hash Brown Potatoes,Breakfast Burrito with Potatoes and Chorizo"
Main Dishes,0.5010553331488439,0.4522048641797001,"Red Quinoa and Avocado Salad,Crispy Fried Chicken,Meaty Stuffed Pepper Casserole"
Mushrooms,0.5661662333275613,0.5231825421444724,"Vegan Lettuce Wraps,Pork Loin Roast with Baby Bellas,Chanterelle Risotto"
Comfort Food,0.39138240109647865,0.27134493299851004,"Slow Cooker Chicken Caesar Sandwiches,Broccoli Cheddar Mac and Cheese,Bacon Mushroom Swiss Meatloaf"
Leftovers,0.45833798422224414,0.37059294141217414,"Chicken Chimichangas,Chicken and Stuffing Casserole,Smoked Salmon Alfredo Sauce"
Camping Recipes,0.426964919259902,0.34529470030162074,"Sara's Beef Jerky,Homemade Chili Sauce,McKagen's Beef Jerky"
Chef John,0.46397830416691177,0.4443050299785631,"Red, White, and Blueberry Lemonade,Drumstick Sundae Jars,Spicy Potsticker Soup"
Noodle Casseroles,0.5107593101343102,0.32554614367114365,"6-Ingredient Ravioli Casserole,Chicken Spinach Alfredo Baked Stuffed Shells,Deluxe Ham Casserole"
Cheese Balls,0.5208515301570859,0.30736588000476894,"Creamy Goat Cheese and Honey,Aunt Rose's Cheese Ball,Salmon Cheese Ball"
Cheesecakes,0.12799152847152848,-0.10081401931401934,"No-Bake Cheesecake with Condensed Milk,PHILADELPHIA New York Cheesecake,Easy Peach Cheesecake"
Enchiladas,0.4630904953185249,0.4018152440716225,"Poblano Chile Enchiladas,Black Bean and Butternut Squash Enchilada Casserole,Angela's Awesome Chicken Enchiladas"
Ground Turkey,0.5694757195162607,0.5212043715412304,"Turkey Potato Casserole,Chili With Turkey and Beans,Sheet Pan Turkey Chili with Cornbread ""Dumplings"""
Pork,0.49379077922751113,0.39651257488665814,"Ginger Pork and Vegetable Stir-fry,Bacon-Wrapped Chicken Skewers,Grilled Ham"
Breakfast Stratas,0.4799461451247166,0.31050736961451253,"Easy Strata and Variations,Sweet Bread Strata,Rita's Eggs Strata"
Dinner,0.5313003622721243,0.4628468602404487,"Cowboy Butter Swim Biscuits,Turkey and Quinoa Meatloaf,Slow Cooker Beef Stew"
Breakfast And Brunch,0.36170201289400294,0.31065550291616906,"Nutty Blueberry Oatmeal,Bananerberry Smoothie,Lela's Protein Mango Smoothie"
Chicken Cordon Bleu,0.38178120125488557,0.08722276261749946,"Weeknight Chicken Cordon Bleu,Chicken Cordon Bleu Sandwich,Easy Baked Chicken Cordon Bleu"
Chicken Parmesan,0.4840137234380932,0.3441620363763222,"Air Fryer Parmesan Chicken Bites,Cheese Lover's Chicken,Easy Parmesan-Crusted Chicken"
Ground Lamb,0.6158102880807991,0.5649356173582178,"Mediterranean Stuffed Zucchini,Margaret's Keftedes (Greek Meatballs),Make-Ahead Moroccan Lamb Stew"
Cakes,0.14527692205809836,0.11270657606391346,"Healthier Bread Pudding II,Blueberry Bundt Cake,Gluten-Free Strawberry Shortcake"
New Year'S,0.404242863123211,0.3297940639306078,"Texas Caviar with Avocado,Hot Chocolate,Eggless Sweet Potato Casserole"
Cooking For Two,0.5088667452947835,0.40307363520822764,"Tender Tomato Chicken Breasts,Sticky Garlic Pork Chops,Emergency Chicken"
Breakfast Casseroles,0.4162816664467608,0.2611858542400996,"Sausage, Cranberry, and Biscuit Breakfast Bake,Banana Cinnamon Roll Casserole,Canadian Bacon Breakfast Stack"
Lunch,0.5274858106081124,0.48690686161443025,"Easy Snack Wraps,Roasted Fall Vegetable Salad,California Club Chicken Wraps"
Pasta Carbonara,0.5518629434538523,0.37880304880304894,"Asparagus Carbonara,Chicken and Shrimp Carbonara,Greek Yogurt Carbonara"
Lamb,0.616301789691864,0.6074491532210261,"Lancashire Hot Pot,Stuffed Greek Leg of Lamb,Chef John's Grilled Lamb Steaks"
Halloween,0.22122758414425073,0.13586655594807764,"Killer Pumpkin Pie,Halloween Chocolate Cupcakes with Monster Peanut Butter Eyes,Pretzel Broomstick"
Ziti,0.5561083032669167,0.4182969924566563,"Red Pepper Tomato Pasta Bake,Ziti with Roasted Zucchini and Garlic,Slow Cooker Baked Ziti"
Nachos,0.41848050450126567,0.28117954197538975,"Awesome Irish Nachos,Tater Tots® Nachos,Beefy Lasagna Nachos"
Allrecipes Allstar Recipes,0.42702891945031934,0.38891156073035726,"Nordstrom's Tomato Basil Soup,Cajun Tartar Sauce,Depression Era Peanut Butter Bread"
Mexican,0.4649378710941425,0.45074391931903923,"Yummy Chicken Burritos,Mexican Sour Cream Rice,Slow Cooker Salsa Chicken"
Meatballs,0.4949106776710942,0.37590037651618535,"Danish Meatballs with Dill Sauce,Easy Homemade Meatballs,Grandma's Authentic Swedish Meatballs"
Winter Squash,0.5664400145269094,0.5274387453822674,"Spaghetti Squash Lasagna,Roasted Delicata Squash with Hot Honey,Easy Spaghetti Squash Spaghetti"
Gumbos,0.5403904831279831,0.5206114456449984,"Instant Pot Chicken and Sausage Gumbo,Healthier Slow Cooker Gumbo,Shrimp Gumbo"
Mardi Gras,0.4161288861060539,0.3602265292090085,"Chef John's Bananas Foster,Pralines II,Cajun Pork Chops"
Cooking For A Crowd,0.38640015640702824,0.27862953581755123,"Easy Roasted Vegetables,Quick and Easy Burrito Casserole,Easy Chocolate Chip Cookie Dough Cheesecake"
Mother'S Day,0.3424391298002409,0.257027393902394,"Sausage Croissants,Cinnamon Roll Monkey Bread,Sizzling Sherry Shrimp with Garlic"
Pies,0.08954358733951047,-0.005505027750464984,"Tieton Apricot Tart with Basil Custard,Fudgy Chocolate Cream Pie,Key Lime and Raspberry Pies in Jars"
Ground Chicken,0.5664986573141653,0.500506558207093,"Chicken Spaghetti Sauce,Baked Chicken Burger,Chicken Cheesesteak"
Picnic Recipes,0.4415071709972399,0.3625414732008506,"Buffalo Chicken Tater Tot Casserole,Hot Honey Butter Cream Cheese Stuffed Bagel,Hawaiian Bruddah Potato Mac (Macaroni) Salad"
Dumplings,0.36255597437110026,0.3141609429319513,"Gnocchi,Slow Cooker Creamy Chicken and Dumplings,Beginner Chicken and Dumplings"
Chiles Rellenos,0.45407338693052984,0.3819233147804577,"Chile Relleno Pancakes,Chile Relleno Casserole,Baked Beef Chiles Rellenos Casserole"
Easter,0.37846148475202734,0.3017438327119087,"Rita's Sweet Holiday Baked Ham,Easy Cucumber Party Sandwiches,Pani Popo (Hawaiian Coconut Bread)"
Healthy Recipes,0.4778214263437902,0.4978763840184394,"Healthier Italian Spaghetti Sauce with Meatballs,Cabbage Apple Soup,Middle Eastern Rice with Black Beans and Chickpeas"
Beef Stews,0.5033248057050403,0.4989092953558492,"Red Wine-Marinated Beef Stew,Oven-Baked Beef Stew,French Onion Beef and Noodles"
Pizza,0.427818576736198,0.33832011547621976,"Mel's Brown Pizza Sauce,Italian Pizza Crust in Bread Machine,Bacon Buffalo Chicken Pizza"
Cabbage Rolls,0.52533433960573,0.5243590403951367,"Ukrainian Beet Green ""Cabbage"" Rolls,Easy Cabbage Roll Casserole,Deconstructed Cabbage Roll Casserole"
Ground Beef,0.5057385409030296,0.4208129592386499,"Baked Cream Cheese Spaghetti Casserole,Neat Sloppy Joes,Slow Cooker Jackfruit Joes"
Paella,0.6364539206370807,0.6667412693822469,"North African Paella,Vegan Paella,Cascadia Fideua"
Korean,0.5364013107545639,0.5397010127686851,"Spicy Korean Ribs,Kimchi Jun (Kimchi Pancake) and Dipping Sauce,Korean Hot Wings"
Manicotti,0.4854548637636873,0.35798032849503436,"Manicotti Alla Romana,Meat Filled Manicotti,Chicken Manicotti Alfredo"
Yeast Breads,0.16413653040553244,0.2788679044511827,"Gluten-Free Sourdough Starter,Pizza Crust I,Angel Biscuit Rolls"
Christmas,0.27167609567405954,0.1721030037835467,"Cranberry Pecan Salad,Broccoli Cashew Salad,Baked Brie in Puff Pastry"
Buffalo Chicken Dips,0.30130952380952375,-0.09281462585034013,"Buffalo Ranch Chicken and Cheese Dip,Cold Buffalo Chicken Dip,Vegetarian Buffalo Chicken Dip"
Burgers,0.5110773049846239,0.3737321757636397,"Indoor Chicken Burgers on Biscuits,Cream Cheese-Jalapeño Hamburgers,Hawaiian Roast Beef Sliders"
Fettuccini,0.5215245158938598,0.36617635914864416,"Creamy Asparagus and Mushroom Pasta,Shrimp and Asparagus Fettuccine,Homemade Chicken Fettuccine"
Father'S Day,0.39350881229881224,0.26212508991009004,"Chili I,Prosciutto Melon Granita,Copycat Cracker Barrel Fried Apples"
Gnocchi,0.5351078551078551,0.4212989127274841,"Pasta with Gorgonzola Sauce and Radicchio,Mushroom Spinach Gnocchi with Creamy Boursin Sauce,Rossi's Sausage Gnocchi"
Diabetic,0.5655652577241588,0.6515569719682336,"Island Chicken with Fruit Salsa,Summer Bean Salad II,No Bake Bumpy Peanut Butter Nuggets"
Hanukkah,0.29813722157472156,0.21958563234604897,"Harvest Noodle Pudding - Fruit Kugel,Potato Latkes from Simply Potatoes,Potato Kugel"
Breads,0.20491030497401572,0.2513349871725023,"Bavarian Pretzels,Bread Machine Monkey Bread,Schlotsky's Bread"
Artichoke Dips,0.5560343467901607,0.3383087519715427,"Super Easy Dip for Artichokes or Asparagus,Skinny Spinach and Artichoke Dip,Vegan Spinach Artichoke Dip"
Minestrone Soups,0.6287874719434983,0.668606689918743,"Sweet Potato Minestrone,Classic Minestrone,Instant Pot Buckwheat Minestra"
Buffalo Chicken Wings,0.3893587263800031,0.16684469195107499,"Buffalo Chicken Wraps,Copycat Cheesecake Factory Buffalo Blasts,Buffalo-Style Chicken Pizza"
Chilaquiles,0.39735591080613697,0.30251087022580236,"Easy Microwave Chilaquiles,Chilaquiles Scramble,Chicken Chilaquiles"
Chicken Noodle Soups,0.5504616883661,0.5595446791770321,"Creamy Buffalo Chicken Noodle Soup,Chicken in Lemongrass Coconut Broth,Cold-Busting Ginger Chicken Noodle Soup"
July 4Th,0.42020274873639524,0.3138305035184849,"Aussie Works Burger,Microwave Corn on the Cob,All-American Trifle"
Omelets,0.5480155893489227,0.43923365215031895,"Keto Buffalo Chicken Omelette,Fresh Apple Omelet,Zucchini Scallion Frittata Cups"
Beef Stroganoff,0.42104363056234717,0.22364474231452838,"Hybrid Hamburger Stroganoff,Marlene's Beef Stroganoff,Easy Beef Stroganoff in the Slow Cooker"
Chicken Marsala,0.45954854017570274,0.4051101234405733,"Chicken with a Creamy Marsala Sauce,Instant Pot® Easy Chicken Marsala,Chicken Marsala Over White Rice"
High Fiber,0.49289655774333213,0.5528865925609285,"Better Baked Beans,Microwave Popcorn,French Orange Poached Pears (Poire Avec Orange)"
Fajitas,0.5669089279921415,0.5288462169505928,"Colorful Vegetable Fajitas,Chicken Fajita Tacos,Pollo Fajitas"
Low Fat,0.4244638228045307,0.4879698055140532,"Orange Sponge Cake,Gizzard Stew,Mint Chutney"
Antipasti,0.5948559002725671,0.5191754850088183,"Air Fryer Pasta Tacos,Italian Tuna Spread,Marinated Feta"
Eggplant Parmesan,0.4931911878970703,0.4565964509346863,"Italian Eggplant Parmigiana,Eggplant Parmesan I,Eggplant Parmesan Bites"
Make-Ahead,0.5276255571305786,0.48124177651616673,"Freezer-Friendly Frittata,Make-Ahead Sweet Potato and Chorizo Breakfast Burritos,Stuffed Shells IV"
Oatmeal Cookies,0.2652501010519878,0.33198523567627347,"Healthier Beth's Spicy Oatmeal Raisin Cookies,Egg-Free Low-Fat Oatmeal Cookies,Cranberry Hootycreeks"
Borscht,0.5165206525500643,0.5753921160538807,"Omi's Borscht,Sweet and Sour Borscht Shooters,Cabbage Borscht Mennonite Soup"
Hawaiian,0.32903387485530355,0.3774142841285698,"Deconstructed Spam Musubi,Hawaiian Beach Shrimp,Hawaiian Coleslaw"
Indian,0.48485979008311,0.5511323177399863,"Mango-Pineapple Chutney,Whole Wheat Chapati,Naan Bread"
Fruit Salads,0.41052375992336604,0.45733093240967254,"Mandarin Orange Watergate Salad,Cantaloupe Dressing,Fun Finger Gelatin"
French Onion Soups,0.5275842249855408,0.3886795815660947,"Restaurant-Style French Onion Soup,French Onion Soup VII,French Onion Soup I"
Pasta Salads,0.5178648643383816,0.4662483254659965,"Shrimp Couscous Salad,Mandarin Chicken Pasta Salad,Lemony Dill Salmon Pasta Salad"
Butternut Squash Soups,0.6177839616253358,0.6198926514789088,"Roasted Butternut Squash Soup with Apples and Bacon,Roasted Butternut Squash, Garlic, and Apple Soup Recipe,Best Butternut Squash Soup Ever"
Cupcakes,0.12680645577967006,0.05070995142423715,"Cinnabon® Cupcakes,Chocolate-Orange Cupcakes with Pistachio Buttercream,Vegan Chocolate Cupcakes with Vanilla Frosting"
Pad Thai,0.46795876742305315,0.5135600644686779,"Okinawan-Style Pad Thai,Zucchini Noodles Pad Thai,Chicken Pad Thai with Peanut Sauce"
Instant Pot,0.5242184401671355,0.5479231409776523,"Instant Pot® Hawaii-Style Shoyu Chicken Drumsticks,Instant Pot Pork Stew,Instant Pot Pasta with Italian Sausage"
Breakfast Burritos,0.4132142857142857,0.31186904761904766,"Migas con Chorizo,Spinach Feta Egg Wrap,Make-Ahead Freezer Breakfast Burritos"
Gluten-Free,0.423676772788615,0.3931881294874716,"Herbed Mushrooms with White Wine,Early Morning Oven Roasted New Potatoes,Green Grape Salad"
Granola,0.5686945320570189,0.6064385751465214,"Sweet Nut and Seed Granola,Paleo Granola,Mom's Best Granola"
Low Calorie,0.4808098505172568,0.47750643401435844,"Shrimp Salsa,One-Dish Rockfish,Mango Sorbet"
Green Salads,0.5431271572343002,0.5533755567939237,"Our Favorite Balsamic Vinaigrette,Strawberry Romaine Summer Salad,Easy Strawberry Vinaigrette"
Cocktails,0.16116303827785414,-0.009925386595545597,"Passion Fruit Margarita,Gene's Long Island Iced Tea,Vampiros Mexicanos (Mexican Vampires)"
Polenta,0.46585452393627125,0.5449350872599141,"Air Fryer Polenta Fries,Vegan Polenta with Ragu,Chef John's Three Corn Polenta"
Mashed Potatoes,0.46195471521942116,0.33968131419234365,"Creamy Mashed Sweet Potatoes,Mascarpone Mashed Potatoes,Loaded Mashed Potatoes"
Pasta Primavera,0.619163070685562,0.6059043642823921,"Creamy Shrimp Pasta Primavera,Lemon Orzo Primavera,Creamy Pasta Primavera with Chicken and Sausage"
Chicken Cacciatore,0.5731782328782329,0.6029348817848819,"Boneless Chicken Cacciatore,Chicken Cacciatore II,Northern Italian-Style Chicken Cacciatore"
Jewish,0.3828314779356445,0.37907889178722526,"Hamantashen II,Baked Acorn Squash,Homemade Chicken Soup"
Jalapeno Poppers,0.47304870129870136,0.13289862914862913,"Baked Bacon Jalapeno Wraps,Spicy Jalapeno Bites,Stuffed Jalapenos"
Food Gifts,0.2919966384966383,0.29785182610182603,"Red Onion Marmalade,Best Toffee Ever - Super Easy,Rich Almond Milk Eggnog"
Banana Breads,0.22244518510713307,0.2525153747959907,"Banana Cream Cheesecake,Vegan Banana Cake,Delicious Vegan Spelt Muffins"
Kosher,0.4044463168792378,0.3767844462278157,"Blueberry Cinnamon Crisp,Roasted Lemon Herb Chicken,Napa Cabbage Salad"
Baked Beans,0.5079961418698261,0.36393620414673045,"3BC (Best Baked Bean Casserole),Western-Style Baked Beans,Bourbon Baked Beans"
Burritos,0.5285570387828792,0.4257711015641688,"Korean Fusion Chicken Burrito,Easy One-Skillet Ground Beef Burrito,Steak Burrito"
Lentil Soups,0.6771031048394494,0.7375117681105078,"Bryan's Spicy Red Lentil Soup,Lentil Curry Soup,Spicy Tomato and Lentil Soup"
Keto,0.49193121693121705,0.30009920634920634,"Keto Air Fryer Jalapeño Poppers,Keto Ice Cream,Turkish Eggs (Cilbir)"
Linguine,0.6034596066819251,0.5320976830103128,"Garlic Shrimp Linguine,Linguine with Peppers and Sausage,Shrimp Scampi with Pasta"
Panini,0.4781825396825397,0.262968253968254,"Healthy Greek Chicken Panini,Panini Sandwiches,Caprese Panini"
Pancakes,0.24609111342408355,0.2908231361889675,"Banana and Peanut Butter Pancakes,Funfetti® Pancakes with Vanilla Cream Sprinkle Sauce,German Apple Pancake"
Air Fryer Recipes,0.4951737070119422,0.39796164561395647,"Air Fryer Naked Chicken Tenders,Air Fryer Lemon-Thyme Baby Red Potatoes,TikTok's Air Fryer Pizza"
Diwali,0.455745378402028,0.494392098714549,"Chef John's Tandoori Chicken,Betty's Green Tomato Chutney,Rasgullas"
Pickles,0.30531413031413035,0.48550213675213677,"Polish Potato Soup,Pickled Eggs and Beets,Yellow Pickled Eggs"
Copycat Recipes,0.32090704337801856,0.22997108780943373,"Copycat Olive Garden Breadsticks,Starbucks Copycat Pineapple Refresher,Copycat Wingstop Cajun Corn"
Chinese,0.4118732725467187,0.39556802537889857,"Moo Goo Gai Pan II,Spicy Tan Tan Soup (Tantanmen or Dan Dan Noodles),Brandi's Wontons"
Low Sodium,0.5602711133143605,0.5876053518956965,"Mandarin Almond Salad,Poached Salmon,Perfect Grilled Zucchini"
Brines,0.4374146357214812,0.576184094969606,"Orange Turkey Brine,Brown Sugar Chicken Brine,Crispiest Buttermilk Fried Chicken"
Overnight Oats,0.6107647907647908,0.7213771645021644,"Overnight Buckwheat Oats,Spicy Gingerbread Overnight Oats,Pumpkin Pie Overnight Oats"
Energy Balls,0.6528822790113114,0.6984785062607644,"Gluten-Free Fried Oatmeal Bites,Chocolate-Cranberry Energy Bars,Peanut Butter Protein Balls"
Chicken Salads,0.538567350487531,0.4699975008258141,"Mediterranean Chicken and Orzo Salad In Red Pepper Cups,Simply The Best Chicken Waldorf Salad,Curry Chicken Salad with Grapes"
Goulash,0.5230684246309246,0.4047377622377623,"Cuban Goulash,Mom's Goulash,Newfie Goulash"
Flan,0.08690854119425548,0.13845616024187452,"Pumpkin Flan,White Chocolate Flan,Coconut Flan"
Cheese Fondue,0.4708073593073593,0.3092305194805195,"Tarek's Irish Stout Fondue,Cheddar-Beer Fondue,Hillshire Farm Lit'l Smokies and Brie Fondue"
Beef Tenderloin,0.5668150706131475,0.4434486613813538,"Louise's Herbed Beef Tenderloin,Confit Olive Oil Steak,Chicken Fried Steak with Cream Pork Sausage Gravy"
Fries,0.3689565796857463,0.30981103194644855,"Low Carb Zucchini Fries,Curried Cottage Fries,French Fried Potatoes"
Labor Day,0.3884355595385006,0.366989322972779,"Dad's Pan-Fried Green Beans,Peach Pie,Watermelon Vodka Slush"
Muffins,0.26621548312435883,0.2981873956532136,"Strawberry Chocolate Chip Muffins,Orange Chocolate Chip Muffins,Low Fat Apple Bran Muffins"
Pancit,0.5538892480068952,0.47706313294548597,"Pancit Molo (Filipino Wonton Soup),Filipino Spaghetti,Pancit Sotanghon"
Lunar New Year,0.3155786607572322,0.31928607107178536,"Lion's Head Meatballs,Beef and Sausage Fried Wontons,Fried Rice with Lychees (Koa Pad Lin Gee)"
Flank Steak,0.5628254038702954,0.5394069088805931,"Stuffed Flank Steak,Braised Flank Steak in the Oven,Grilled Mexican Steak"
Broccoli Salads,0.3980050042550043,0.4645762802012802,"Trees, Seeds, and Beans (Broccoli Slaw),Southern Broccoli and Cauliflower Salad,Donna Leigh's Creamy Broccoli Slaw"
Chicken And Dumplings,0.3041501880472469,0.3601049942121371,"Polish Chicken and Dumplings,Chicken and Dumplings with Bisquick,Chicken and Dumplings with Vegetables"
Jell-O Shots,-0.13416666666666668,-0.19826797385620917,"Baileys and Coffee Jell-O Shots,Strawberry Cheesecake Jell-O Shots,Top Shelf Sparkling Margarita Jell-O"
Empanadas,0.3309894393664339,0.29265887178366345,"Argentinean-Inspired Beef Mini Empanadas,Empanadas Abiertas de Humita (Creamy Corn Empanadas),Baked Chicken Empanadas"
Ceviche,0.6662000499500501,0.6859982725607725,"Basic Ceviche,Javi's Really Real Mexican Ceviche,Shiitake Mushroom Ceviche"
Cranberry Sauces,0.3683579753579753,0.44176404349618625,"Cranberry Sauce with Apples,Fresh Cranberry Sauce,Becky's Mom's Cranberry Sauce"
Egg Rolls,0.3232212569712569,0.2192674817674818,"Easy Chicken Curry Egg Rolls,Bekki's Mexican Egg Rolls,Instant Pot Egg Roll in a Bowl"
Kwanzaa,0.5183907883734873,0.531774774629446,"Sweet Potato Pie II,African Sweet Potato and Peanut Soup,Garlic Chicken Fried Chicken"
Grits,0.4274593994142866,0.36260054064565334,"Spicy Shrimp and Grits,Gourmet Wasabi Grits,Kentucky Garlic Cheese Grits"
Zucchini Breads,0.24881324892377138,0.30107363924590824,"Farm Fresh Zucchini Cranberry Nut Muffins,Mom's Spiced Zucchini Bread,Banana Zucchini Bread Muffins"
Etouffee,0.5055272178801591,0.5257137666255314,"Catfish Étouffée,Tammi's Crawfish Etoufee,Microwave Shrimp Étouffée"
Pavlovas,0.16898476523476524,0.20071109446109445,"Pavlova Christmas Trees,Banoffee Pavlova,Schaum Torte"
Fried Chicken,0.33411657786657784,0.2488253933566434,"Air Fryer Cornflake Chicken Fingers,Southern Fried Chicken,Dooky Chase-Style Fried Chicken"
Frostings And Icings,0.1422272950191147,0.06403096020605209,"Rosemary Shortbread Cookies,Super Simple Perfect Chocolate Ganache,Sable Cookies"
Danishes,0.02023809523809524,-0.08917233560090702,"Raspberry Pain au Chocolat (Raspberry Chocolate Croissants),Swedish Tea Ring,Cheese Filling For Pastries"
Eggnog,0.3097949735449735,0.017077991452991464,"Sugar Free Eggnog,Eggnog I,Spiked Eggnog"
Low Cholesterol,0.36917043274186134,0.45753272521129656,"Mini Meringues,Cranberry Salsa,Sweet Candied Orange and Lemon Peel"
Frittatas,0.5628675898390441,0.5028095034116444,"Paleo Omelet Muffins,Nan's Potato and Egg Frittata,Baked Omelet"
Gravies,0.31674368921122176,0.23471922197571554,"Apple-Sausage Gravy Boats,Tomato-Bacon Gravy,Easiest Brown Gravy Ever"
Crisps And Crumbles,0.2568529645419179,0.23265699336193518,"Charred Spiced Pears with Smoky Vanilla-Cherry Sauce,Peach Crumble Cake,Blue Cheese and Pear Tartlets"
Pet Food,0.48403549382716043,0.603089175485009,"Peanut Butter and Banana Dog Biscuits,Poochie Meat Cakes,Peanut Butter and Carrot Dog Treats"
Hushpuppies,0.20467532467532465,0.2030735930735931,"Buttermilk Hush Puppies,Hawaiian Hush Puppies,Quick and Easy Hush Puppies"
Calzones,0.1820833333333333,0.20134259259259257,"Sausage, Spinach, and Ricotta Calzone,Cheeseburger Garbage Bread,Bread Machine Calzone"
French Toast,0.418543906236214,0.3570255172178249,"Blueberry Stuffed French Toast,Sandwich French Toast Casserole,Overnight Apple Cinnamon French Toast"
Chocolate Cakes,0.17165645934947404,0.106423040807232,"Chocolate Carrot Cupcakes,Cranberry Cupcakes with White Chocolate Frosting,Black Magic Cake"
Oatmeal,0.5684356962481962,0.6162453778860029,"Baked Cranberry Oatmeal,Protein Powder Overnight Oats with Blueberries and Peanut Butter,Baked Oatmeal"
Gazpacho,0.6006513047138048,0.6966719276094276,"Shrimp Gazpacho,Summer Watermelon Gazpacho,Mexican Gazpacho"
Monkey Bread,0.1406122448979592,0.031479591836734724,"Monkey Bread with Butterscotch Pudding,Easy Maple Bacon Monkey Bread,Monkey Bread with a Twist"
Ground Pork,0.5281049351882685,0.3942610321776989,"Pork Dumplings,Grandma's Crispy Pork Wontons,Traditional Filipino Lumpia"
Cookies,0.15177401723841943,0.12472084106982197,"Raspberry Almond Kiss Cookies,Amazing Gluten-Free Layer Bars,Pineapple Upside Down Bars"
Meal Prep,0.5077069567859042,0.42821827295511505,"Oat Milk,Make-Ahead Sausage and Veggie Bowls,Instant Pot Taco Bowls"
Corned Beef,0.4412407862407862,0.27510832260832263,"Easy Corned Beef and Cabbage,Corned Beef Hash Quiche,Guinness Corned Beef"
Margaritas,0.2897883597883598,0.22590788840788842,"Blood Orange Margarita,Atole de Elote,Agua de Jamaica (Iced Hibiscus Tea)"
Key Lime Pie,0.09563492063492064,-0.03472222222222221,"Classic Key Lime Pie,Key Lime Pie - Low Carb Version,Key Lime and Pretzel Pie"
Crab Cakes,0.4821267507002801,0.4220082548170784,"Maryland Crab Cakes III,Mini Crab Cakes,Paleo Maryland Crab Cakes"
Fudge,0.1879456018518519,-0.005488177910052909,"Peanut Butter Fudge with Condensed Milk,Candy Cane Fudge,Chocolate Lovers' Fudge with Jack Daniel's® Whiskey"
Ice Cream,0.22231054839821068,0.12539682629780044,"Marshmallow Hot Fudge Sauce,Vegan Coconut Caramel,Creme Fraiche"
Bar Cookies,0.20380852093341487,0.12012769830150989,"Apple Butter Bars,Pumpkin Bars with Cream Cheese Filling,Lemon Glazed Date Sticks"
Applesauce,0.3876349206349206,0.46811111111111114,"Willis Farm Applesauce,Apple-Pear Sauce,Holiday Cranberry and Apple Compote"
Brownies,0.21975319606697152,0.12960007820977207,"Berry and White Chocolate Blondies,White Chocolate Blondies,Jeanine's Decadent Brownies"
Pastries,0.09819892884892877,0.06833446969696966,"Chef John's Parker House Rolls,Puff Pastry Bear Claws,Monkey Bread Made Easy"
Bloody Marys,0.30136625357213587,0.2858420809401202,"The Ultimate Shaken Bloody Mary,Tito's Bloody Mary,Classic Canadian Caesar"
Pasties,0.5117460317460317,0.3498412698412699,"Easy Cabbage Pockets,Vegetable Cornish Pasties,Cornish Pastie II"
Blintzes,0.25143826659451657,0.1395785984848485,"Marylyn's Cheese Blintzes,Cheese Blintzes II,Chocolate Raspberry Blintzes"
Flat Iron Steak,0.6520321558783095,0.6322178889486582,"Drunken Flat Iron Steak,Flat Iron Steak Grilled to a 'Tea',Grilled Gorgonzola Flat Irons"
Yams,0.4276263880411477,0.40158071619456065,"Sweet Potato Cranberry Bake,Air-Fried Purple Yam Fries with Sour Cream Sriracha Sauce,Ube Halaya"
Passover,0.4638114349275065,0.43070128303846805,"Best Matzo Balls,Chocolate Decadence Cake I,Spinach with Chickpeas and Fresh Dill"
Chicken Piccata,0.47889742735896584,0.47474239435777893,"Chicken Piccata II,Oven-Baked Chicken Piccata Recipe,My Best Chicken Piccata"
Chicken Teriyaki,0.41857661598018386,0.4370705552082119,"Pineapple Teriyaki Sauce,Chicken Teriyaki Crispy Rice,Teriyaki Grilled Shrimp Skewers"
Fried Rice,0.5247439708623919,0.5253732551429917,"Pineapple Shrimp Fried Rice,Stir-Fried Rice,Pineapple Fried Rice with Ham"
Popcorn,0.20644176729703048,0.1431882737145895,"Spicy-Sweet Buffalo Popcorn,Halloween Popcorn Pumpkins,Kool-Aid® Popcorn"
Lettuce Wraps,0.6027377936820661,0.6194765378240611,"Asian Roll Lettuce Wrap,Thai Lettuce Cups with Red Curry Potatoes,One-Bite Thai ""Flavor Bomb"" Salad Wraps (Miang Kham)"
Pecan Pie,0.1482119564997716,0.03925487871916444,"Pecan Pie Tarts,Pecan Pie Bites from Scratch,Easy Pecan Pie Cheesecake"
Christmas Cookies,0.12418575011579643,0.07217951875165278,"Oatmeal Scotchies Cookies,Salted Caramel Spritz,Best Spritz Cookies"
Jell-O Salads,0.13662220662220662,0.09498172998172998,"Stained Glass Gelatin Cake,Vegan Gelatin,Spooky JELL-O JIGGLERS"
Mousses,0.33376245976245966,0.18354057054057052,"Easy Passion Fruit Mousse,Lemon Peach Parfaits,Best Chocolate Mousse Cake"
Chocolate Chip Cookies,0.1926815502632448,0.11191264735040043,"Gooey Vegan Chocolate Chip Cookies,Anna's Chocolate Chip Cookies,Chocolate Oatmeal Drop Cookies"
Pierogies,0.23289177489177487,0.1624935064935065,"Babaci's Potato Pierogi,Pierogi I,Cottage Cheese Perogies"
Canning And Preserving,0.3593210223842092,0.43272633197083765,"Pickled Green Beans,Apple-Pumpkin Butter,Prickly Pear Jelly"
Whole30,0.6233046398046398,0.6546228632478633,"Baked Fresh Rainbow Trout,Pinakbet,Stove Top Pot Roast"
Falafel,0.5296536796536796,0.5832743014561197,"Waffled Falafel,Air Fryer Falafel (Gluten Free),Spicy Baked Falafel with Tzatziki"
Mojitos,0.1660930735930736,0.2803354978354978,"Bubbly Mojito,No-Sweat Mojito,Fruity Mojitos"
Deviled Eggs,0.49170569851604334,0.36979589376141103,"Deviled Eggs with Zip,Garlic, Basil, and Bacon Deviled Eggs,Classic Deviled Eggs"
Jerky,0.527587348548887,0.45504766600920443,"Spicy Salmon Jerky,Ground Beef Jerky,Griswolds Turkey Jerky"
Lent,0.5340608368239947,0.5134765234765235,"Chef John's Salmon Cakes,Asparagus, Snow Pea, and Radish Salad,Eggs Poached in Tomato Sauce"
Paleo,0.6152690631468205,0.6553713548502154,"Whipped Banana ""Ice Cream"",Basic Broiled Chicken Breasts,Tuna and Avocado Salad"
Coleslaws,0.44990237703472985,0.45938084791025957,"Japanese-Style Cabbage Salad,Fruited Coleslaw,Red Cabbage and Celery Root Coleslaw with Apple Cider Dressing"
Pestos,0.6835372280780443,0.6616577583414318,"Cilantro Jalapeno Pesto with Lime,Parmesan Pesto Roasted Cauliflower,Pesto-Crusted Grouper"
Garlic Bread,0.5330753968253968,0.38238095238095243,"Cheesy Stuffed Garlic Hawaiian Rolls,Unbelievable Grilled Garlic Bread,Toasted Garlic Bread"
Macaroons,0.24410714285714286,0.21122023809523807,"Stovetop Chocolate Coconut Macaroons,Grandma's Corn Flake Coconut Macaroons,Peanut-Free Chocolate Macaroons"
Bruschetta,0.5780996472663138,0.4093694885361552,"Jen's Tomato Arugula Bruschetta,Lazy Bruschetta,Molletes"
Gingersnaps,0.14861471861471862,0.2669408369408369,"Soft Gingersnaps,Whole Wheat Ginger Snaps,Crispy Vegan Gingersnaps"
Mediterranean Diet,0.644448599645968,0.6779469835719836,"Broiled Spanish Mackerel,Garlic and Herb Marinade,Greek Chicken Pasta"
Cherry Pie,0.05750257678829105,0.01859779770494058,"Mock Cheese Cake Pie,Skillet Cherry Cobbler (Gluten-Free),Cajun Sweet Dough"
Jambalayas,0.5912962962962962,0.5494444444444445,"Low Carb Jambalaya,Cabbage Jambalaya,Instant Pot® Cajun Jambalaya"
Pate,0.557936067200773,0.477846222405046,"Danish Chicken Liver Pate,Salmon Terrine,George's Salmon-Pepper Pate"
Bagels,0.16198979591836735,0.14065759637188208,"Tori's Air Fryer Pumpkin Bagels,2-Ingredient Dough Bagels,Grandma Sherrill's Bagels"
Cornbread,0.1612509448223734,0.1701114890400605,"Sweet Jalapeño Cornbread,Mom's Mexican Cornbread,Cornbread Made with Coconut Oil"
Pizza Dough,0.29609977324263037,0.4074716553287982,"World's Easiest Bread Machine Pizza Dough,Chef John's Cauliflower Pizza Crust,Chef John's Easy Homemade Pizza Dough"
Homemade Pasta,0.2657770861617016,0.34220255527947846,"Badische Schupfnudeln (Potato Noodles),Spinach Pasta Dough,Homemade Saffron Pasta"
Cobblers,0.11639094286530186,0.11800774961031374,"Peach Pie with Frozen Peaches,Apple-Blueberry Buckle,Easy Fruit Cobbler"
Whole Wheat Breads,0.29670282708744244,0.43180426411195644,"Whole Wheat Honey Bread,Double Pumpkin-Beer Bread,Cracked Wheat Bread"
Gingerbread Cookies,0.227001554001554,0.31529254079254077,"Egg-Free Gingerbread Cookies,Gingerbread Straws,Grandpa's Easy Vegan Gingerbread Cookies"
Hummus,0.6648563064842137,0.7449711657851192,"Easy Black Bean Hummus,Joe's Hummus with Pine Nuts,Decadent Hummus"
Fruitcakes,0.15712207147691015,0.10485403485403488,"Mulled Wine Cake,Chocolate Rum Cake,Pistachio Nut Bundt Cake"
Blueberry Pie,0.1020962207726914,0.10659223129811367,"Creamy Blueberry Pie,Rustic Blueberry and Fig Crostata,Old-Fashioned Blueberry Custard Pie"
Cooking For One,0.5552425772880317,0.4583099392190302,"Sea Bass Barbecue,Flatbread Breakfast Pizza,Tomato Basil Salmon"
Chocolate Fudge,0.2247312925170068,-0.0629331065759637,"Chocolate Walnut Fudge,Black Bottom Butterscotch Fudge,Dark Chocolate Peppermint Fudge Recipe"
Egg Salads,0.5474525166191833,0.4094776828110162,"Shrimp Egg Salad,Creamy Cauliflower Egg Salad,Warm Chicken, Bacon, and Egg Salad with Mayonnaise Dressing"
Crackers,0.2993578643578643,0.22678210678210683,"Figs with Caramelized Onions and Goat Cheese,Wheat Crackers,3-Ingredient Parmesan Cookies"
Pie Crusts,0.11780375180375179,-0.025367965367965362,"Crumb Topping for Pies,Rich Shortcrust Pastry,Vanilla Wafer Crust"
Biscotti,0.18067676767676769,0.14071248196248198,"Easy Mocha Biscotti,Italian Easter Cookies (Biscotti),Raspberry Lemonade Biscotti"
Coffee Cakes,0.18307317203868934,0.18028004562487326,"Old Fashioned Coffee Cake with Cinnamon-Streusel Topping,Blueberry Buttermilk Coffeecake,Butterkuchen"
Low Glycemic Impact,0.46176406926406927,0.47362554112554117,"Vegetarian Chickpea Sandwich Filling,Ginger Glazed Mahi Mahi,Tempura Dipping Sauce"
Gyros,0.5830615773115773,0.668458041958042,"Grilled Gyro Burgers,Venison Gyros,Gyros"
Peanut Butter Cookies,0.16739621489621487,0.09044261294261295,"Peanut Butter Cup Brownies,Chocolate Coated Peanut Butter Crackers,Old Fashioned Peanut Butter Cookies"
Fondant,0.08666666666666671,0.15888888888888889,"Homemade Marzipan,Rolled Buttercream Fondant,Chocolate Fondant A La Maille®"
Whoopie Pies,-0.017875724153297686,-0.009527271135727017,"Let's Make Whoopie Pies,Neapolitan Whoopie Pies,Cake Mix Whoopie Pies"
Guacamole,0.6880967570441255,0.7260210184552292,"Avocado and Black Bean Dip,Spicy Guacamole with Chipotle,Asparagus Guacamole"
Flatbreads,0.16369839265672598,0.2533139931056599,"Easy Naan,Naan,Easy Grilled Shrimp Fajitas"
Cinnamon Rolls,0.20589672232529374,0.16727581941867656,"Grandma Rita's Soft Butter Rolls,Orange Cinnamon Rolls,Cinnamon Roll Focaccia"
Creme Brulee,0.1082581453634085,-0.09731943495101389,"Keto Crème Brûlée,Cali's Sinful Creme Brulee,Chai Latte Creme Brulee"
Bulgogi,0.508043623043623,0.5042324342324342,"Dak Bulgogi (Korean Barbeque Chicken),Beef Bulgogi with Dipping Sauce,Bulgogi (Korean Barbecued Beef)"
Lemon Bars,-0.07039862914862914,-0.19699925074925073,"Lemon Curd Bars,Lemon Bar Peeps,Luscious Lemon Triangles"
Waffles,0.2448095238095238,0.22155165945165947,"Puff Pastry Waffles,Zucchini Oatmeal Waffles,Eggnog Waffles"
Popovers And Yorkshire Puddings,0.22350336700336698,0.1645892255892256,"Fancy Pear Popovers,Grandma's Yorkshire Pudding,Blueberry Popovers"
Blondies,0.23933682983682977,0.13483139083139084,"Best Ever Chocolate-Free Blondies,Chocolate Chip Cream Cheese Brownies,Bake Sale Chocolate Chip Oatmeal Brownies"
Irish Soda Bread,0.08587844903634377,0.1375088946141578,"Nana Dot's Irish Soda Bread,Spotted Dog Irish Bread,Irish Soda Bread"
Kalbi,0.5833333333333333,0.5010416666666666,"Gluten-Free Kalbi Beef,Korean BBQ-Inspired Short Ribs"
Doughnuts,-0.01951101808244665,0.007808302808302829,"Easy Funnel Cakes,Banana Fritters,Struffoli"
Filet Mignon,0.5678571428571428,0.4361111111111111,"Filet Mignon and Balsamic Strawberries,Teri Tips,Herb-Marinated Tenderloin"
Carrot Cakes,0.12614267676767676,0.0311805555555556,"Swiss Carrot Cake,Brazilian Carrot Cake,Lite Carrot Cake"
Jams And Jellies,0.29859693877551013,0.3735216965574109,"Mulberry Jam,Mango Jam,Watermelon Rind Preserves"
Lemonade,0.17328951719576724,0.4054704034391536,"Watermelon-Raspberry Lemonade,Watermelon Lemonade,Watermelon Strawberry Mango Lemonade Smoothie"
Angel Food Cakes,0.09922669922669923,0.15557251390584725,"Two Part Angel Cake,Cherry Angel Food Cake,Gluten-Free Angel Food Cake"
Mincemeat Pie,0.02261904761904761,-0.11785714285714284,"Classic Mincemeat Pie,Homemade Mince Pie with Crumbly Topping,Traditional Mince Pies"
Apple Pie,0.09356814995703887,0.04946884391328835,"Iron Skillet Apple Pie,Easy Swedish Apple Pie,Perfect Apple Crisp Pie"
Drop Cookies,0.16016223240361177,0.16350949816467064,"White Chocolate Chip Oatmeal Cookies,Chewy Chocolate Chip Oatmeal Cookies,Zucchini Cookies"
Chess Pie,0.24718253968253967,0.16709235209235213,"Simple Canadian Butter Tarts,Sugar Pie IV,Maple Walnut Pie"
Pork Chops,0.5142857142857143,0.4,Cast Iron Pork Chops - The Secret to the Best Pork Chops Is Your Cast Iron Skillet
Chicken Adobo,0.43951298701298697,0.5434415584415585,"Chicken Adobo I,Slow Cooker Filipino Chicken Adobo,Pinoy Chicken Adobo"
Biscuits,-0.06811355311355312,-0.032083333333333325,"Sour Cream Biscuits,Basic Biscuits,Super Easy Shortcake Biscuits"
English Muffins,0.17559523809523805,0.3351190476190476,"No-Knead English Muffin Loaves,Homemade English Muffins,Easy English Muffins"
Divinity,0.22166666666666665,0.25666666666666665,"Georgia Nuggets,Gelatin Divinity"
`;

//read in data
const data = d3.csvParse(csvdata.trim());

//config
const x_label_font_size = 15;
const y_label_font_size = 15;
const datapoint_radius = 5;
const window_scale = 0.95;
const x_axis_space = 5;

//prepare canvas
const margin = {top: 80, right: 50, bottom: 50, left: 50},
    width = window.innerWidth * window_scale - margin.left - margin.right,
    height = window.innerHeight * window_scale - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//color scale
const color = d3.scaleOrdinal()
  .domain(data.map(d => d.category))
  .range(data.map((d, i) => d3.interpolateRdYlGn((i / data.length))));

//add x axis
const x = d3.scaleLinear()
  .domain([d3.min(data.map(d => +d.avg_mood)), d3.max(data.map(d => +d.avg_mood))])
  .range([ margin.left + datapoint_radius, width - datapoint_radius]);

const x_labels = Array(10).fill("");
x_labels[0] = "better mood";
x_labels[9] = "worse mood";

const x_axis_scale = d3.scaleBand()
  .range([ width, 0])
  .domain(x_labels)
  .padding(0.05);

svg.append("g")
  .style("font-size", x_label_font_size)
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x_axis_scale).tickSize(0))
  .select(".domain").remove()

//add y axis
const y = d3.scaleLinear()
  .domain([d3.min(data.map(d => +d.avg_health)), d3.max(data.map(d => +d.avg_health))])
  .range([ height - datapoint_radius - x_axis_space, datapoint_radius]);

const y_labels = Array(10).fill("");
y_labels[0] = "Unhealthier";
y_labels[9] = "Healthier";

const y_axis_scale = d3.scaleBand()
  .range([ height, margin.top])
  .domain(y_labels)
  .padding(0.05);

const y_axis = svg.append("g")
  .style("font-size", y_label_font_size)
  .call(d3.axisLeft(y_axis_scale).tickSize(0));

y_axis.select(".domain").remove();
y_axis.selectAll("text").attr("transform", "rotate(-90) translate(0, -20)");


//tool tip helpers
const tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "1px")
  .style("border-radius", "5px")
  .style("padding", "10px");

const mouseover = function(d) {
  tooltip
    .style("opacity", 1);
}

const mousemove = function(event, d) {
  const [x, y] = d3.pointer(event, this);

  tooltip
    .html(`Category: ${d.category}<br>Sample Recipe: ${d.recipe_selection.split(",")[0]}`)
    .style("left", x + "px")
    .style("top", y + "px");
};

const mouseleave = function(d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", 0)
};

//add data
svg.append('g')
  .selectAll("dot")
  .data(data)
  .enter()
  .append("circle")
    .attr("cx", d => x(d.avg_mood))
    .attr("cy", d => y(d.avg_health))
    .attr("r", datapoint_radius)
    .style("fill", d => color(d.category))
  .on("mouseover", mouseover )
  .on("mousemove", mousemove )
  .on("mouseleave", mouseleave )
