resource "aws_iam_role" "lambda_execution" {
  name               = "lambda-execution"
  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "lambda.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_execution" {
  name = "lambda-execution-policy"
  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Sid" : "DefaultLogging",
        "Effect" : "Allow",
        "Action" : [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        "Resource" : "*"
      }
    ]
  })
}

resource "aws_iam_role_policy_attachment" "lambda_logging" {
  role       = aws_iam_role.lambda_execution.name
  policy_arn = aws_iam_policy.lambda_execution.arn
}

locals {
  backend_env_content = <<EOT
OPENAI_API_KEY="${var.openai_api_key}"
  EOT
}

resource "local_file" "backend_environment" {
  content  = local.backend_env_content
  filename = "${local.backend_root}/.env.local"
}

data "external" "backend_build" {
  depends_on = [local_file.backend_environment]
  program = ["bash", "-c", <<EOT
(npm run build) >&2 && echo "{\"dest\": \"dist\"}"
EOT
  ]
  working_dir = local.backend_root
}

data "archive_file" "backend_build" {
  depends_on = [
    data.external.backend_build
  ]
  type        = "zip"
  source_dir  = "${data.external.backend_build.working_dir}/${data.external.backend_build.result.dest}"
  output_path = "backend_build.zip"
}
