# moon-climber

moon-climber is a [NodeCG](http://github.com/nodecg/nodecg) bundle.
It works with NodeCG versions which satisfy this [semver](https://docs.npmjs.com/getting-started/semantic-versioning) range: `^2.0.0`
You will need to have an appropriate version of NodeCG installed to use it.


## Developing

Use the following commands:

-   `npm run build`: Build the project once.
-   `npm run watch`: Build the project and automatically rebuild on changes.
-   `npm run dev`: Build the project, automatically rebuild on changes, launch the NodeCG server, and automatically restart the NodeCG server on changes.
    -   Only restarts the NodeCG server when server-side (i.e. extension) code changes. Changes to client-side code (i.e. dashboard panels and graphics) will not cause the server to restart, nor will they cause browser tabs to automatically refresh.

## Credits
This overlay is made by Sylvia Crowe (oneirocosm).
The CSS Reset made by Andy Bell. You can find it [here](https://piccalil.li/blog/a-more-modern-css-reset/)
The Audiowide font was created by Brian J. Bonislawsky DBA Astigmatic (AOETI) (astigma@astigmatic.com), with the Reserved Font Name "Audiowide"