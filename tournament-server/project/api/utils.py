import os
from werkzeug.utils import secure_filename
from imagekitio.client import ImageKit


ACCESS_PRIVATE_KEY = os.getenv('IMAGEKIT_PRIVATE_KEY')
ACCESS_PUBLIC_KEY = os.getenv('IMAGEKIT_PUBLIC_KEY')
ACCESS_URL_ENDPOINT = os.getenv('IMAGEKIT_URL_ENDPOINT')

imagekit = ImageKit(
    private_key=ACCESS_PRIVATE_KEY,
    public_key=ACCESS_PUBLIC_KEY,
    url_endpoint=ACCESS_URL_ENDPOINT
)

def upload_file(file, file_name):
    response = imagekit.upload_file(
        file=file,
        file_name=file_name
    )

    return response

def secure_file(file) -> dict:
    filename = secure_filename(file.filename)
    filetype = file.content_type

    # save file locally
    file.save(filename)
    filesize = os.stat(filename).st_size

    return {
        "filename": filename,
        "filetype": filetype,
        "filesize": filesize
    }