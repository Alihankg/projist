'use client'
import Navbar from './Navbar'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { use, useState } from 'react'
import { send } from './ai'

const history: string[] = []

export default function Home() {
	const [text, setText] = useState('')
	const [history, setHistory] = useState<string[]>([])
	const handleClick = async () => {
		const resp = (await send(text)) as string
		setHistory(h => [...h, text, resp])
	}
	return (
		<>
			<Navbar />
			<div className="p-8 text-base-300 mx-auto h-1/2 max-h-min">
				<div className="flex flex-col gap-4">
					{history.map((msg, i) => (
						<div key={i}>
							<div
								className={`w-fit max-w-4xl rounded p-4 bg-slate-200 text-black ${
									i % 2 == 0 ? 'ml-auto' : 'left-0'
								}`}>
								{<Markdown remarkPlugins={[remarkGfm]}>{msg}</Markdown>}
							</div>
						</div>
					))}
				</div>
				<div className="mt-4 flex items-center gap-4">
					<textarea
						onChange={e => setText(e.target.value)}
						value={text}
						className="textarea bg-slate-200 w-1/3"
					/>
					<button
						className="btn btn-outline rounded-full"
						onClick={handleClick}>
						Gönder
					</button>
				</div>
			</div>
		</>
	)
}
