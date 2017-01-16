#!/bin/bash
set -e

if [[ "$OSTYPE" == "darwin"* ]]; then
	realpath() { [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"; }
	ROOT=$(dirname $(dirname $(realpath "$0")))
else
	ROOT=$(dirname $(dirname $(readlink -f $0)))
fi

# Integration Tests
./scripts/code.sh $ROOT/extensions/Sbox-api-tests/testWorkspace --extensionDevelopmentPath=$ROOT/extensions/Sbox-api-tests --extensionTestsPath=$ROOT/extensions/Sbox-api-tests/out
./scripts/code.sh $ROOT/extensions/Sbox-colorize-tests/test --extensionDevelopmentPath=$ROOT/extensions/Sbox-colorize-tests --extensionTestsPath=$ROOT/extensions/Sbox-colorize-tests/out
