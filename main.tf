terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
}

provider "github" {
  token = var.github_token
  owner = "gabi89luch"
}

# Using data source for existing repository
data "github_repository" "blog" {
  name = "blog"
}

# Branch Protection
resource "github_branch_protection" "main" {
  repository_id = data.github_repository.blog.node_id
  pattern       = "main"
  
  required_status_checks {
    strict = true
  }
  
  required_pull_request_reviews {
    dismiss_stale_reviews = true
    required_approving_review_count = 1
  }
}

# Repository Webhook for Jenkins
resource "github_repository_webhook" "jenkins" {
  repository = data.github_repository.blog.name
  
  configuration {
    url          = var.jenkins_webhook_url
    content_type = "json"
    insecure_ssl = false
  }
  
  active = true
  events = ["push"]
}

# Labels for Issues
resource "github_issue_label" "deployment" {
  repository  = data.github_repository.blog.name
  name        = "deployment"
  color       = "0E8A16"
  description = "Deployment related issues"
}

resource "github_issue_label" "success" {
  repository  = data.github_repository.blog.name
  name        = "success"
  color       = "28A745"
  description = "Successful operations"
}
