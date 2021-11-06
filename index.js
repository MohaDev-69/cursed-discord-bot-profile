require("dotenv").config()
const {
	Discord,
	Client,
	Intents,
	MessageAttachment
} = require("discord.js")
const client = new
Client({
	intents: [
		Intents.FLAGS.GUILDS
	]
})
const Canvas = require("canvas");
const jimp = require("jimp")
const {
	REST
} = require('@discordjs/rest');
const {
	Routes
} = require('discord-api-types/v9');
const {
	connect
} = require("mongoose")
const Coins = require('./models/coins.js');
const Rep = require('./models/rep.js');
const Note = require('./models/note.js');
const ms = require('pretty-ms')
const {
	millify
} = require('millify')
client.on("interactionCreate", async interaction => {
	const Dataa = await Coins.findOne({
		userID: interaction.user.id
	});
	const RepData = await Rep.findOne({
		userID: interaction.user.id
	});
	const NoteData = await Note.findOne({
		userID: interaction.user.id
	});
	if(!interaction.isCommand) return;
	if(interaction.commandName == "profile") {
		await
		interaction.
		deferReply()
		let Image = Canvas.Image,
			canvas = new
		Canvas.
		createCanvas(400, 400),
			ctx = canvas.getContext('2d');
		const background = await Canvas.loadImage("https://f.top4top.io/p_21317j91r1.png");
		ctx.drawImage(background, 0, 0, 400, 400);
		let url = interaction.user.displayAvatarURL({
			format: "png"
		}).endsWith(".webp") ? interaction.user.displayAvatarURL({
			format: "png"
		}).slice(5, -20) + ".png" : interaction.user.displayAvatarURL({
			format: "png"
		});
		jimp.read(url, (err, ava) => {
			if(err) return;
			ava.
			getBuffer(jimp.MIME_PNG, (err, buf) => {
				if(err) return;
				ctx.font = 'bold 25px kathen';
				ctx.fillStyle = "#ffffff";
				ctx.textAlign = "center";
				ctx.fillText(`${interaction.user.username}`, 195, 230)
				ctx.font = "bold 25px  kathen"
				ctx.fillStyle = "#16bbc7";
				ctx.textAlign = "center";
				let CoinsData = "0"
				if(CoinsData) {
					CoinsData = Dataa.coins
				}
				ctx.fillText(`${millify(CoinsData, {precision: 2, decimalSeparator: ","})}`, 50, 255)
				ctx.font = "bold 30px  kathen"
				ctx.fillStyle = "#16bbc7";
				ctx.
				textAlign = "center";
				let RepDataa = "0"
				if(RepDataa) {
					RepDataa = RepData.rep
				}
				ctx.fillText(`${millify(RepDataa, {precision: 2, decimalSeparator: ","})}`, 360, 260)
				ctx.font = "bold 25px  kathen"
				ctx.fillStyle = "#ffffff";
				ctx.textAlign = "center";
				let NoteDataP = "No Note"
				if(NoteData) {
					NoteDataP = NoteData.note
				}
				ctx.fillText(`${NoteDataP}`, 230, 365)
				let Avatar = Canvas.Image;
				let ava = new Avatar;
				ava.src = buf;
				ctx.beginPath();
				ctx.arc(320.5, 80.5, 50, 0, Math.PI * 2, true);
				ctx.closePath();
				ctx.clip();
				ctx.drawImage(ava, 267, 29, 110, 110);
				const ff = canvas.toBuffer();
				const fimage = new
				MessageAttachment(ff, "profile.png")
				interaction.
				editReply({
					files: [fimage]
				})
			})
		})
	}
	if(interaction.commandName == "salary") {
		await
		interaction.deferReply()
		let amount = Math.floor(Math.random() * 5000) + 1000;
		let cooldownData = Dataa;
		if(cooldownData == null) {
			cooldownData = "0"
		}
		if(cooldownData !== null) {
			cooldownData = cooldownData.cooldown
		}
		if((Number(cooldownData) - Date.now()) > 0) return interaction.editReply(`❌ - try again after : ${ms(Number(Dataa.cooldown) - Date.now())}`)
		if(!Dataa) {
			new Coins({
				userID: interaction.user.id,
				coins: amount,
				cooldown: Date.now() + 86400000
			}).save()
			return interaction.editReply(`🎉 - you got: ${amount}`)
		} else {
			Dataa.coins += amount;
			Dataa.cooldown = Date.now() + 86400000;
			await Dataa.save();
			return interaction.editReply(`🎉 - you got: ${amount}`)
		}
	}
	if(interaction.commandName == "rep") {
		await
		interaction.deferReply();
		let MentiondUser = interaction.options.getUser("user");
		if(MentiondUser.bot || MentiondUser == interaction.user) return interaction.editReply(`❌ - this user is bot or this user trying to give him-self rep`)
		let MentiondUserData = await
		Rep.findOne({
			userID: MentiondUser.id
		});
		let ThisUser = RepData;
		if(!ThisUser) {
			await new Rep({
				userID: interaction.user.id,
				cooldown: "1",
				rep: 0,
			}).save();
		}
		if(!MentiondUserData) {
			await
			new
			Rep({
				userID: MentiondUser.id,
				rep: 0,
				cooldown: "1"
			}).save();
		}
		if(Number(ThisUser.cooldown) - Date.now() > 0) return interaction.editReply(`❌ - try again after : ${ms(Number(ThisUser.cooldown) - Date.now())}`);
		MentiondUserData.rep += 1;
		ThisUser.cooldown = Date.now() + 86400000;
		await ThisUser.save();
		await MentiondUserData.save();
		return interaction.editReply(`🎉 - ${interaction.user} has give a ${MentiondUser} a rep`);
	}
	if(interaction.commandName === "note") {
		await
		interaction.deferReply();
		let notee = interaction.
		options.
		getString("your_note")
		if(!NoteData) {
			if(notee.length > 19) return interaction.editReply(`❌ - max note letters is: 19`)
			await
			new
			Note({
				userID: interaction.user.id,
				note: notee
			}).save()
			await interaction.editReply(`✅ - your note has been updated to: ${notee}`)
		} else {
			if(notee.length > 19) return interaction.editReply(`❌ - max note letters is: 19`)
			NoteData.note = notee
			await NoteData.save()
			await interaction.editReply(`✅ - your note has been updated to: ${notee}`)
		}
	}
});
client.on("ready", () => {
	const commands = [{
		name: "profile",
		description: "show your cursed profile"
	}, {
		name: "salary",
		description: "take your salary"
	}, {
		name: "rep",
		description: "give a user a rep",
		options: [{
			name: "user",
			description: "the user",
			type: 6,
			required: true
		}]
	}, {
		name: "note",
		description: "type a note for your profile",
		options: [{
			name: "your_note",
			description: "the note",
			type: 3,
			required: true
		}]
	}]
	const rest = new
	REST({
		version: '9'
	}).setToken(process.env.TOKEN);
	(async() => {
		try {
			await
			rest.put(Routes.applicationCommands(client.user.id), {
				body: commands
			}, );
			console.log("commands updated!")
		} catch(error) {
			console.error(error);
		}
	})();
	console.log("working!")
})
client.login(process.env.TOKEN)
connect(process.env.MONGO, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	ignoreUndefined: true,
});
