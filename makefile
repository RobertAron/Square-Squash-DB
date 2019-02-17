reset-local:
	@node -e 'require(./BuildScripts/SetupDB.js).restartDB()'
deploy:
	@sls deploy --aws-profile robert
remove:
	@sls remove --aws-profile robert
deploy-functions:
	@sls deploy function --function editPlayer