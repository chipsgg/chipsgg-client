workflow "Test & Publish" {
  on = "push"
  resolves = ["Publish NPM Package"]
}

action "Run Tests" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "test"
}

action "Publish NPM Package" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "publish"
  secrets = ["NPM_AUTH_TOKEN"]
  needs = ["Run Tests"]
}
