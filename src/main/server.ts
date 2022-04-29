import { app } from './config/app'

const port = 5050
app.listen(port, () => console.info(`[+] Server is running on port ${port}`))
