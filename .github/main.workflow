workflow "New workflow" {
  on = "push"
  resolves = ["Publish NPM Package"]
}

action "Filters for GitHub Actions" {
  uses = "actions/bin/filter@c6471707d308175c57dfe91963406ef205837dbd"
  args = "tag"
}

action "Run Tests" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["Filters for GitHub Actions"]
  args = "test"
}

action "Publish NPM Package" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Run Tests"]
}
