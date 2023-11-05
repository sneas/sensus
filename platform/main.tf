terraform {
  backend "s3" {
    bucket         = "sensus-tfstate"
    region         = "us-east-1"
    key            = "sensus"
  }
}

provider "aws" {
  region = "us-east-1"
}
