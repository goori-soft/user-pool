import type {Config} from '@jest/types'
const config: Config.InitialOptions = {
    rootDir: ".",
    transform: { '.+\\.ts$': 'ts-jest', },
    moduleNameMapper: {
        "^@\/(.*)$": "<rootDir>/src/$1"
    },
    setupFiles: [
        './tests/setup/env.ts'
    ]
}
export default config