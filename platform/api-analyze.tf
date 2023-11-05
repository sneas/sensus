resource "aws_lambda_function" "analyze" {
  filename         = data.archive_file.backend_build.output_path
  function_name    = "analyze"
  role             = aws_iam_role.lambda_execution.arn
  handler          = "analyze.analyze"
  source_code_hash = "data.archive_file.lambda_zip.output_base64sha256"
  runtime          = "nodejs18.x"
  timeout          = 10
}

resource "aws_lambda_function_url" "lambda_function_url" {
  function_name      = aws_lambda_function.analyze.arn
  authorization_type = "NONE"
}

output "function_url" {
  description = "And the function URL is..."
  value       = aws_lambda_function_url.lambda_function_url.function_url
}
