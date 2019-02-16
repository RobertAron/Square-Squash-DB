reset-local:
	@node ./BuildScripts/SetupDB.js
deploy:
	@sls deploy --aws-profile robert
remove:
	@sls remove --aws-profile robert
deploy-functions:
	@sls deploy function --function editPlayer