export default function DownloadBlob(data: string) {
	const blob = new Blob([data], { type: 'text/plain' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	document.body.appendChild(link);
	link.style.display = 'none';
	link.setAttribute('href', url);
	link.setAttribute('download', 'data.txt');
	link.click();
	document.body.removeChild(link);
}
