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

The structure is as follows:

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

	This is useful if you use other Git servers like GitHub Enterprise, GitLab, or Bitbucket. In my case, I used to use a private GitHub Enterprise server at work, so I had a `github` and `github-work` directory for each site.

3. `<GitHub org / username>`

	Each GitHub org/user should have their own directory within the `github` directory.

4. `<GitHub repo name>`

	The repository clone should be in a subdirectory named after the repository.

## Cloning repositories

### Your own repository

For your own repo, simply clone it to the appropriate directory:

<TerminalWindow>

```sh
git clone git@github.com:my-user/my-repo.git ~/Developer/github/my-user/my-repo
```
</TerminalWindow>

> **Tip:** If `~/Developer/github/my-user/` doesn't exist yet, `git clone` will automatically create it for you.


### Forked repository

When cloning forks, use the original namespace:

1. Fork the repository on GitHub.

2. Clone _the forked version_ to the directory of the original org.

	For example, if contributing to `vercel/next.js`, clone `my-fork/next.js` to `~/Developer/github/vercel/next.js`:

	<TerminalWindow>

	```sh
	git clone git@github.com:my-fork/next.js.git ~/Developer/github/vercel/next.js
	```
	</TerminalWindow>


	This ensures that your clone has the correct `origin` remote set up for pushing.

3. Add the upstream remote as `up` (short for "upstream"):

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

### GitHub mirror

- You don't have to think about how to organize your repositories; you're simply following GitHub's structure.
- Avoid name collisions as GitHub ensures unique repository names within an org.

### Finding code

- Quickly locate any repository due to the familiar organization.
- Easily `grep` across multiple repositories with the results clearly indicating repository paths.

### Scoped Git configurations

If you're a dev with both personal and work projects in the same environment, you may want to commit using your work email for repositories in the work org.

This setup allows you can configure this seamlessly in your top-level `~/.gitconfig` by toggling the appropriate Git profile based on which directory you're in.

Here's an example of how to set up three different profiles based on the org:

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

Note, the above explicitly references a `.gitconfig` file in each org directory. To set this up, create a `.gitconfig` with the relevant configuration:

```ini
[user]
	name = Hiroki Osame
	email = email@company.com
```

Now, whenever you commit in your personal repositories, Git will use your personal email. And when you commit to repos in your work org, it will use your work email.

By setting up different configs for each org, you can easily switch between your personal and work-related projects, ensuring that your commits and contributions are associated with the correct identity.

## Try it out!

Using the _GitHub Tree_ structure for organizing repository clones can greatly streamline your workflow as a software engineer. It ensures a clear and scalable organization, eliminates name collisions, and simplifies finding repositories.

Give it a try, and let me know what you think!
