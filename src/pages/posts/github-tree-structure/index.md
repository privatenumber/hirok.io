---
title: The "GitHub Tree" structure
subtitle: A convention for organizing your GitHub repository clones
date: 2023-08-05
tags: GitHub, Git, Open Source, Engineering, Software Engineering, Workflow, Organization, Productivity
duration: 5min
---

As a software engineer, cloning repositories using Git is a common task. Most devs just create a single `projects` directory and clone all repositories there. However, this approach does not scale well and can lead to organizational issues like name collisions and difficulty finding repositories.

## Solution: The _GitHub Tree_ structure

The _GitHub Tree_ structure is a straightforward yet effective way to organize your repositories by mirroring the organization on GitHub. It helps establish a clear structure that scales as your collection grows.

The structure is simple:

```tree
~/Developer
└── github
    └── <GitHub org / username>
        └── <GitHub repo name>
```

1. `~/Developer`

	Choose a top-level directory for all your coding-related activities.
	
	While I use `~/Developer`, feel free to use a different path of your preference. On macOS, `Developer` is a [special directory with a unique icon](https://weblog.antranigv.am/posts/2023/02/hardcoded-folder-icons-in-macos/), making it appropriate for my usage.


2. `github`

	Within the top-level directory, create a subdirectory named `github`. This indicates that everything inside mirrors GitHub, and allows you to use the `Developer` directory for other things.

	This is useful if you use other Git servers like GitHub Enterprise, GitLab, or Bitbucket. In my case, I used to use a private GitHub Enterprise server at work, so I had a `github` and `github-work` directory to differentiate between the two websites.

3. `<GitHub org / username>`

	Each GitHub org/user should have their own directory within the `github` directory.

4. `<GitHub repo name>`

	The repository clone should be in a subdirectory named after the repository.

## Cloning repositories

### Your own repository

To clone your own repository, simply run:

<TerminalWindow>

```sh
git clone git@github.com:my-user/my-repo.git ~/Developer/github/my-user/my-repo
```
</TerminalWindow>

> **Tip:** If `~/Developer/github/my-user/` doesn't exist yet, `git clone` will automatically make it for you.


### Forked repository

When cloning forks, use the original namespace:

1. Fork the repository on GitHub.

	For example, if contributing to `vercel/next.js`, fork it to `my-user/next.js`.

2. Clone _the forked version_ to the directory of the original org.

	For example, clone `my-user/next.js` to `~/Developer/github/vercel/next.js`:

	<TerminalWindow>

	```sh
	git clone git@github.com:my-user/next.js.git ~/Developer/github/vercel/next.js
	```
	</TerminalWindow>


	This ensures that your clone has the correct `origin` remote set up for pushing.

3. Add the upstream remote as `up` (which stands for "upstream"):

	<TerminalWindow>

	```sh
	git remote add up git@github.com:vercel/next.js.git
	```
	</TerminalWindow>

	This way `origin` will point to your fork, and `up` will point to the original repo.
	
	You can pull in the latest changes from `up`:

	<TerminalWindow>

	```sh
	git pull up <branch-name>
	```
	</TerminalWindow>

This approach helps maintain a clear separation between your repos and forks.

## Benefits of the _GitHub Tree_

By organizing your repositories with the _GitHub Tree_ structure, you'll enjoy several benefits:

### Mirror GitHub

- You don't have to think about how to organize your repositories; you're simply following GitHub's structure.
- Avoid name collisions as GitHub ensures unique repository names within an org.

### Finding code

- Quickly locate any repository due to the familiar organization.
- Easy grepping with clearly indicated repository paths in the results.

### Scoped Git configurations

As a developer working on personal and work-related projects, you might need to switch between different Git configurations or profiles. To accomplish this, you can add toggling logic in your top-level `~/.gitconfig` file.

Here's an example of how to set up two different profiles based on the org:

`~/.gitconfig`:
```ini
# My default profile
[user]
	name = Hiroki Osame
	email = personal@email.com

# My profile for Org A
[includeIf "gitdir:~/Developer/github/org-a/"]
	path = ~/Developer/github/org-a/.gitconfig

# My profile for Org B
[includeIf "gitdir:~/Developer/github/org-b/"]
	path = ~/Developer/github/org-b/.gitconfig
```

For each org's `.gitconfig`:

```ini
[user]
	name = Hiroki Osame
	email = email@company.com
```

By setting up different configs for each org, you can easily switch between your personal and work-related projects, ensuring that your commits and contributions are associated with the correct identity.

## Try it out!

Using the _GitHub Tree_ structure for organizing repository clones can greatly streamline your workflow as a software engineer. It ensures a clear and scalable organization, eliminates name collisions, and simplifies finding repositories.

Give it a try, and let me know what you think!
