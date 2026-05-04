# Security Policy

## Supported Versions

This project is an active portfolio and learning project. Security fixes are applied to the `main` branch.

## Reporting a Vulnerability

If you find a security issue, please do not open a public issue with secrets, session files, phone numbers, or exploit details.

Report it privately by contacting the maintainer through GitHub. Include:

- A short description of the issue
- Steps to reproduce
- Affected files or endpoints
- Suggested fix, if you have one

## Sensitive Data

Never commit these files:

- `.env` files
- WhatsApp/Baileys auth folders such as `.wa-auth/`, `auth/`, or `auth_info_baileys/`
- API keys, database URLs, QR codes, screenshots with tokens, or real customer chats

If a WhatsApp session file has been committed, remove it from Git history before publishing and reconnect the WhatsApp device to generate a fresh session.
