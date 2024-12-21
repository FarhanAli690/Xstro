import { bot } from '#lib';
import { upload, XSTRO } from '#utils';

bot(
	{
		pattern: 'sticker',
		public: true,
		desc: 'Converts Images and Videos to Sticker',
	},
	async message => {
		let media;
		if (
			!message.reply_message ||
			(!message.reply_message.image && !message.reply_message.video)
		)
			return message.send('_Reply with an Image or Video_');
		media = await message.download();
		let url = await upload(media);
		const sticker = await XSTRO.makeSticker(url.rawUrl);
		return await message.send(sticker, { type: 'sticker' });
	},
);

bot(
	{
		pattern: 'take',
		public: true,
		desc: 'rebrands a sticker to bot',
	},
	async message => {
		let media;
		if (!message.reply_message.sticker)
			return message.send('_Reply a sticker only!_');
		media = await message.download();
		let url = await upload(media);
		const sticker = await XSTRO.makeSticker(url.rawUrl);
		return await message.send(sticker, { type: 'sticker' });
	},
);

bot(
	{
		pattern: 'flip',
		public: true,
		desc: 'Flip media left/right/vertical/horizontal',
	},
	async (message, match) => {
		const { reply_message } = message;
		if (!reply_message?.image && !reply_message?.video)
			return message.send('_Reply to an Image or Video_');

		const validDirections = ['left', 'right', 'vertical', 'horizontal'];
		if (!validDirections.includes(match))
			return message.send(
				`_Usage: ${message.prefix}flip <${validDirections.join(
					'/',
				)}>`,
			);

		const media = await message.download();
		const { rawUrl } = await upload(media);
		console.log(rawUrl);
		const flipped = await XSTRO.flipMedia(rawUrl, match);

		return message.send(flipped, { caption: '_Flipped successfully_' });
	},
);

bot(
	{
		pattern: 'black',
		public: true,
		desc: 'Converts Audio to Black Video',
	},
	async message => {
		let media;
		if (!message.reply_message.audio)
			return message.send('_Reply Audio_');
		media = await message.download();
		const url = await upload(media);
		const video = await XSTRO.blackvideo(url);
		return await message.send(video);
	},
);
