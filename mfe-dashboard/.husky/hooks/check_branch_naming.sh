#!/usr/bin/env bash

# Define the regex for valid branch names
valid_branch_regex='^(feature|bug)\/[a-zA-Z]+-\d+-[a-zA-Z0-9-]+$'

# Get the current local branch name
local_branch_name=$(git rev-parse --abbrev-ref HEAD)

echo "valid_branch_regex: $valid_branch_regex"
echo "local_branch_name: $local_branch_name"

message="There's something wrong with your branch name. Branch names in this project must adhere to this contract: $valid_branch_regex. Your commit will be rejected. You should rename your branch to a valid name and try again."

# Check if the branch name matches the regex
if ! echo "$local_branch_name" | grep -Eq "$valid_branch_regex"; then
    echo "$message"
    exit 1
fi

exit 0