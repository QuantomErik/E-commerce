import os
import boto3
from botocore.exceptions import NoCredentialsError

# AWS S3 Configuration
AWS_ACCESS_KEY_ID = 'AKIA6ODU66UK37Q4P5VP'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'quantombucket'
AWS_S3_REGION_NAME = 'eu-north-1'

s3 = boto3.client('s3', region_name=AWS_S3_REGION_NAME,
                  aws_access_key_id=AWS_ACCESS_KEY_ID,
                  aws_secret_access_key=AWS_SECRET_ACCESS_KEY)

def upload_files(directory, bucket):
    if not os.path.exists(directory):
        print(f"The directory {directory} does not exist.")
        return

    for root, dirs, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            s3_key = os.path.relpath(file_path, directory).replace('\\', '/')
            print(f"Preparing to upload {file_path} to s3://{bucket}/products/{s3_key}")
            try:
                s3.upload_file(file_path, bucket, f'products/{s3_key}')
                print(f'Successfully uploaded {file_path} to s3://{bucket}/products/{s3_key}')
            except FileNotFoundError:
                print(f'The file {file_path} was not found')
            except NoCredentialsError:
                print('Credentials not available')

# Use an absolute path for the media directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
media_dir = os.path.join(BASE_DIR, 'media/products')
upload_files(media_dir, AWS_STORAGE_BUCKET_NAME)
