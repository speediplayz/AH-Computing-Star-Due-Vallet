// has to be initialized here so they exist when they get called later on
let ctx = document.getElementById("canv").getContext("2d");
let player = new Player(new Vector2(128, 128), new Vector2(32, 32));

// market GUI pages
let GUI_Market = [
	new Display // tools
	(
		ctx,
		new Rect(ctx, new Vector2(24, 24), new Vector2(592, 592), "rgb(0,123,140)", true, 4, "rgb(0,0,0)"),
		[
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(448, 512), new Vector2(128, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(25, 19), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "Close", "30px helvetica"),
				"rgb(235,30,15)", "rgb(205,15,0)", "rgb(175,0,0)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(16, 512), new Vector2(128, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 19), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "Sell", "30px helvetica"),
				"rgb(30,225,15)", "rgb(15,195,0)", "rgb(0,175,0)"
			),
			new Button
			( // watering can 1
				ctx,
				new Rect(ctx, new Vector2(12, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(28, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(12).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // watering can 2
				ctx,
				new Rect(ctx, new Vector2(204, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(28, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(13).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // watering can 3
				ctx,
				new Rect(ctx, new Vector2(396, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(28, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(14).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // trowel
				ctx,
				new Rect(ctx, new Vector2(108, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(28, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(15).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // soil
				ctx,
				new Rect(ctx, new Vector2(300, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(28, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(11).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(12, 204), new Vector2(88, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(12, 45), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "<", "96px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(492, 204), new Vector2(88, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(18, 45), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), ">", "96px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Text(ctx, new Rect(ctx, new Vector2(272, 531), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "1 / 2", "30px helvetica"),
			new Picture(ctx, new Rect(ctx, new Vector2(40, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_5_1.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(232, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_5_2.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(424, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_5_3.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(136, 224), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_0_4.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(328, 224), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_5_0.png")
		]
	),
	new Display // crops
	(
		ctx,
		new Rect(ctx, new Vector2(24, 24), new Vector2(592, 592), "rgb(0,123,140)", true, 4, "rgb(0,0,0)"),
		[
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(448, 512), new Vector2(128, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(25, 19), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "Close", "30px helvetica"),
				"rgb(235,30,15)", "rgb(205,15,0)", "rgb(175,0,0)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(16, 512), new Vector2(128, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 19), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "Sell", "30px helvetica"),
				"rgb(30,225,15)", "rgb(15,195,0)", "rgb(0,175,0)"
			),
			new Button
			( // potato
				ctx,
				new Rect(ctx, new Vector2(12, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(1).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // carrot
				ctx,
				new Rect(ctx, new Vector2(204, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(3).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // barley
				ctx,
				new Rect(ctx, new Vector2(396, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(5).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // tomato
				ctx,
				new Rect(ctx, new Vector2(108, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(7).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // rock
				ctx,
				new Rect(ctx, new Vector2(300, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(38, 150), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), Item.getItemByID(9).cost + " Coins", "32px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(12, 204), new Vector2(88, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(12, 45), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "<", "96px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			(
				ctx,
				new Rect(ctx, new Vector2(492, 204), new Vector2(88, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(18, 45), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), ">", "96px helvetica"),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Text(ctx, new Rect(ctx, new Vector2(272, 531), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "2 / 2", "30px helvetica"),
			new Picture(ctx, new Rect(ctx, new Vector2(40, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_0_0.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(232, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_1_0.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(424, 32), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_2_0.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(136, 224), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_3_0.png"),
			new Picture(ctx, new Rect(ctx, new Vector2(328, 224), new Vector2(128, 128), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_4_0.png")
		]
	)
];

// player GUI
let GUI_Player =
[
	new Picture(ctx, new Rect(ctx, new Vector2(8, 8), new Vector2(64, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/gui/icon_score.png"),
	new Picture(ctx, new Rect(ctx, new Vector2(8, 72), new Vector2(64, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/gui/icon_coin.png"),
	new Picture(ctx, new Rect(ctx, new Vector2(8, 136), new Vector2(64, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/gui/icon_item.png"),
	new Text(ctx, new Rect(ctx, new Vector2(90, 12), new Vector2(0, 0), "rgb(255,255,255)", false, 0, "rgb(0,0,0)"), "0", "64px helvetica"),
	new Text(ctx, new Rect(ctx, new Vector2(90, 76), new Vector2(0, 0), "rgb(255,255,255)", false, 0, "rgb(0,0,0)"), "0", "64px helvetica"),
	new Picture(ctx, new Rect(ctx, new Vector2(72, 136), new Vector2(64, 64), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"), "img/item/tilemap/tile_null.png")
];

// page 1 buy, sell, next page
GUI_Market[0].elements[0].onclick.push(closePages);
GUI_Market[0].elements[1].onclick.push(sellItem);
GUI_Market[0].elements[8].onclick.push(()=>{ GUI_Market[0].enabled = false; GUI_Market[1].enabled = true; });

// page 2 buy, sell, prev page
GUI_Market[1].elements[0].onclick.push(closePages);
GUI_Market[1].elements[1].onclick.push(sellItem);
GUI_Market[1].elements[7].onclick.push(()=>{ GUI_Market[0].enabled = true; GUI_Market[1].enabled = false; });

/*
	Because of a stupid decision I made
	a year ago when making the GUI class,
	I can't provide any parameters to the
	onclick events, meaning that I can't
	easily make the code in the following
	buttons into 1 function with a param.
*/

// page 1 button events
GUI_Market[0].elements[2].onclick.push(()=>{ let item = Item.getItemByID(12); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[0].elements[3].onclick.push(()=>{ let item = Item.getItemByID(13); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[0].elements[4].onclick.push(()=>{ let item = Item.getItemByID(14); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[0].elements[5].onclick.push(()=>{ let item = Item.getItemByID(15); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[0].elements[6].onclick.push(()=>{ let item = Item.getItemByID(11); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });

// page 2 button events
GUI_Market[1].elements[2].onclick.push(()=>{ let item = Item.getItemByID(1); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[1].elements[3].onclick.push(()=>{ let item = Item.getItemByID(3); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[1].elements[4].onclick.push(()=>{ let item = Item.getItemByID(5); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[1].elements[5].onclick.push(()=>{ let item = Item.getItemByID(7); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });
GUI_Market[1].elements[6].onclick.push(()=>{ let item = Item.getItemByID(9); if(player.item.id == 0 && player.coins >= item.cost) { player.coins -= item.cost; player.item = item.clone(); player.score += 25; closeMarket(); } });

// close button event function
function closePages() { for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; }

// sell button event function
function sellItem() { player.coins += player.item.value; player.score += 25; player.item = Item.getItemByID(0); for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; }