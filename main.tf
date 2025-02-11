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
}

variable "github_token" {
  description = "GitHub Personal Access Token"
  type        = string
  sensitive   = true
}

# Repository Configuration
resource "github_repository" "blog" {
  name        = "blog"
  description = "Portfolio website for ICT Software Developer course"
  
  visibility  = "public"
  has_issues  = true
  has_wiki    = true
  has_projects = true
  
  pages {
    source {
      branch = "gh-pages"
      path   = "/"
    }
  }
}

# Branch Protection
resource "github_branch_protection" "main" {
  repository_id = github_repository.blog.node_id
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
  repository = github_repository.blog.name
  
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
  repository  = github_repository.blog.name
  name        = "deployment"
  color       = "0E8A16"
  description = "Deployment related issues"
}

resource "github_issue_label" "success" {
  repository  = github_repository.blog.name
  name        = "success"
  color       = "28A745"
  description = "Successful operations"
}

resource "github_issue_label" "failure" {
  repository  = github_repository.blog.name
  name        = "failure"
  color       = "DC3545"
  description = "Failed operations"
}

# GitHub Pages Settings
resource "github_repository_file" "cname" {
  repository = github_repository.blog.name
  branch     = "gh-pages"
  file       = "CNAME"
  content    = "gabi89luch.github.io"
  commit_message = "Add CNAME file for GitHub Pages"
  
  depends_on = [github_repository.blog]
}

# Output Values
output "repository_url" {
  value = github_repository.blog.html_url
}

output "pages_url" {
  value = "https://gabi89luch.github.io/blog/"
}
