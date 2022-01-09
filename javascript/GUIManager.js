let ctx = document.getElementById("canv").getContext("2d");

// 0, 123, 140
// 0, 112, 127

let GUI_Market = [
	new Display
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
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // watering can 2
				ctx,
				new Rect(ctx, new Vector2(204, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // watering can 3
				ctx,
				new Rect(ctx, new Vector2(396, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // trowel
				ctx,
				new Rect(ctx, new Vector2(108, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // soil
				ctx,
				new Rect(ctx, new Vector2(300, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
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
			new Text(ctx, new Rect(ctx, new Vector2(272, 531), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "1 / 2", "30px helvetica")
		]
	),
	new Display
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
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // carrot
				ctx,
				new Rect(ctx, new Vector2(204, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // barley
				ctx,
				new Rect(ctx, new Vector2(396, 12), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // tomato
				ctx,
				new Rect(ctx, new Vector2(108, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
				"rgb(200,200,200)", "rgb(180,180,180)", "rgb(160,160,160)"
			),
			new Button
			( // rock
				ctx,
				new Rect(ctx, new Vector2(300, 204), new Vector2(184, 184), "rgb(0,0,0)", true, 4, "rgb(0,0,0)"),
				new Text(ctx, new Rect(ctx, new Vector2(0, 0), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "", ""),
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
			new Text(ctx, new Rect(ctx, new Vector2(272, 531), new Vector2(0, 0), "rgb(0,0,0)", false, 0, "rgb(0,0,0)"), "2 / 2", "30px helvetica")
		]
	)
];

GUI_Market[0].elements[0].onclick.push(()=>{ for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; });
GUI_Market[0].elements[1].onclick.push(()=>{ player.coins += player.item.value; player.item = Item.getItemByID(0); for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; });
GUI_Market[0].elements[8].onclick.push(()=>{ GUI_Market[0].enabled = false; GUI_Market[1].enabled = true; });

GUI_Market[1].elements[0].onclick.push(()=>{ for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; });
GUI_Market[1].elements[1].onclick.push(()=>{ player.coins += player.item.value; player.item = Item.getItemByID(0); for(let i = 0; i < GUI_Market.length; i++) GUI_Market[i].enabled = false; });
GUI_Market[1].elements[7].onclick.push(()=>{ GUI_Market[0].enabled = true; GUI_Market[1].enabled = false; });