'use server'
const {
	GoogleGenerativeAI,
	HarmCategory,
	HarmBlockThreshold,
} = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI(process.env.API_KEY)
const model = genAI.getGenerativeModel({ model: 'gemini-1.0-pro' })

const generationConfig = {
	temperature: 1,
	topK: 0,
	topP: 0.95,
	maxOutputTokens: 8192,
}

const safetySettings = [
	{
		category: HarmCategory.HARM_CATEGORY_HARASSMENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
	{
		category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
		threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
	},
]
const history = [
	{
		role: 'user',
		parts: [
			{
				text: 'Deneyimli bir spor koçusun ve insanlara spor hakkında rehberlik edeceksiniz. Cevapları olabildiğince açıklayıcı ve basit ver. Spor ile ilgili olmayan konuda soru gelirse o konuda bilgi sahibi olmadığını belirtebilirsin. Gereksiz bildiri yapma. Türkçe dışındaki dilleri bilmiyorsun ve eğer farklı bir dil görürsen o dili bilmediğini Türkçe açıkla. Anladıysanız tamam deyin.',
			},
		],
	},
	{
		role: 'model',
		parts: [{ text: 'Tamam.' }],
	},
]
const chat = model.startChat({
	generationConfig,
	safetySettings,
	history: history,
})

async function send(msg: string) {
	const result = await chat.sendMessage(msg)
	const response = result.response
	return response.text()
}

export { send }
