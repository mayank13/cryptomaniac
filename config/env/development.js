/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  moneeda : {
    url : 'https://api.moneeda.com',
    token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRldkBnbG92b2FwcC5jb20iLCJpZCI6IjVhNTcyZGEyNTM4OWMzNzZiZWZlNjY1NCIsImlhdCI6MTUxNTY2MjgyMn0.a6homMOumqLBxwfX9nOwbBaxmSx-srkS8dISSPCPPYE'
  }
};
