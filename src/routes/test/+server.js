const SIZE = 20000000;

/**
 *
 * @param {number} length
 * @returns
 */
function makeRandomString(length) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	let counter = 0;
	while (counter < length) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
		counter += 1;
	}
	return result;
}

const someLargeAmountOfData = makeRandomString(SIZE).match(/(.{1,4})/g) ?? [];

// console.log('someLargeAmountOfData length:', someLargeAmountOfData.length);
// console.log('someLargeAmountOfData:', someLargeAmountOfData);

export function GET() {
	let streamCanceled = false;
	const stream = new ReadableStream({
		start(controller) {
			for (const chunk of someLargeAmountOfData) {
				if (streamCanceled) {
					return;
				}
				controller.enqueue(chunk);
				console.log(chunk);
			}
			controller.close();
		},
		cancel() {
			streamCanceled = true;
		}
	});

	return new Response(stream, {
		headers: {
			'Cache-Control': 'no-store'
		}
	});
}
