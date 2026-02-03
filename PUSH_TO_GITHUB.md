# Push EczemaEase to GitHub

Follow these steps in a terminal (PowerShell or Command Prompt) from your project folder.

## Prerequisites

- **Git** installed: [git-scm.com](https://git-scm.com/) (if not already installed)
- **GitHub account** and signed in

---

## Step 1: Open terminal in the project folder

```powershell
cd "c:\Users\meeta\OneDrive\Documents\eczema ease"
```

---

## Step 2: Initialize Git and make the first commit (if needed)

If this folder is **not** already a git repo:

```powershell
git init
git add .
git commit -m "Initial commit: EczemaEase symptom tracker app"
```

If it **is** already a git repo, just ensure everything is committed:

```powershell
git status
git add .
git commit -m "Initial commit: EczemaEase symptom tracker app"
```

---

## Step 3: Create the GitHub repository

### Option A – Using the GitHub website

1. Go to [github.com/new](https://github.com/new)
2. **Repository name:** `eczema-ease`
3. **Description (optional):** Eczema symptom tracker – React + Vite + Tailwind
4. Choose **Public**
5. **Do not** check "Add a README" or "Add .gitignore" (you already have them)
6. Click **Create repository**

### Option B – Using GitHub CLI (if you have `gh` installed)

```powershell
gh repo create eczema-ease --public --source=. --remote=origin --push
```

If that runs successfully, you’re done. Otherwise use Option A and then do Step 4.

---

## Step 4: Add the remote and push (if you used Option A)

GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eczema-ease.git
git push -u origin main
```

If you use **SSH** instead of HTTPS:

```powershell
git remote add origin git@github.com:YOUR_USERNAME/eczema-ease.git
git push -u origin main
```

---

## Step 5: Confirm on GitHub

Open `https://github.com/YOUR_USERNAME/eczema-ease` and confirm all files are there.

---

## Troubleshooting

- **"git is not recognized"**  
  Install Git from [git-scm.com](https://git-scm.com/) and restart the terminal.

- **"Permission denied" or "Authentication failed"**  
  Use a [Personal Access Token](https://github.com/settings/tokens) instead of a password when pushing over HTTPS, or set up [SSH keys](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

- **Repo already exists**  
  If you already created `eczema-ease` on GitHub, skip creating it again and only run the `git remote add origin` and `git push` commands from Step 4.
