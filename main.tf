terraform {
  required_providers {
    github = {
      source  = "integrations/github"
      version = "~> 5.0"
    }
  }
  
  backend "local" {
    path = "terraform.tfstate"
  }
}

provider "github" {
  token = var.github_token
  owner = "gabi89luch"
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

# Using data source for existing repository instead of creating new one
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
    url          = "http://your-jenkins-url/github-webhook/"
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

resource "github_issue_label" "failure" {
  repository  = data.github_repository.blog.name
  name        = "failure"
  color       = "DC3545"
  description = "Failed operations"
}

# Repository Settings
resource "github_repository_settings" "blog" {
  repository = data.github_repository.blog.name
  
  has_issues = true
  has_wiki   = true
  has_projects = true
  
  allow_merge_commit = true
  allow_squash_merge = true
  allow_rebase_merge = true
  
  pages {
    source {
      branch = "gh-pages"
      path = "/"
    }
  }
}

# Output Values
output "repository_url" {
  value = data.github_repository.blog.html_url
}

output "pages_url" {
  value = "https://gabi89luch.github.io/blog/"
}
