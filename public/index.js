
var droparea,
    cancel,
    canvas,
    context,
    images,
    onDragOver,
    onDrop,
    onReaderLoaded,
    processFile;

canvas = document.getElementById('canvas');
droparea = document.getElementById('droparea');
images = document.getElementById('images');

context = canvas.getContext('2d');

cancel = function(event) {
    event.stopPropagation();
    event.preventDefault();
};

onDragOver = function(event) {
    cancel(event);
    this.className = 'drag-over';
    return false;
};

onDrop = function(event) {
    cancel(event);
    var files = event.dataTransfer.files;
    for (var i = 0, len = files.length; i < len; i++) {
        processFile(files.item(i));
    }
    this.className = "";
	return false;
};

onReaderLoaded = function(event) {
    var image = new Image();
    var onImageLoaded = function(event) {
        context.drawImage(image, 0, 0, image.width, image.height);
    };
    image.onload = onImageLoaded;
    image.src = event.target.result;
};

processFile = function(file) {
    var reader = new FileReader();
    reader.onload = onReaderLoaded;
    reader.readAsDataURL(file);
    droparea.innerHTML += "processing " + file.name + "<br>";
};

droparea.addEventListener('dragenter', cancel, false);
droparea.addEventListener('dragexit', cancel, false);
droparea.addEventListener('dragover', cancel, false);
droparea.addEventListener('drop', onDrop, false);

