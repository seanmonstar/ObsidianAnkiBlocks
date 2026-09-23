module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
        '^ankibridge/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.(pegjs|js\\.static|svg_content|html)$': '<rootDir>/scripts/jest-text-transform.cjs',
    },
}
