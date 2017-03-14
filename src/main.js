
let fetch = require('node-fetch');

let promise = fetch ('https://api.github.com/users/'+process.argv[2],

{
  method:'GET',
  headers: {
    Authorization: 'token ' + process.argv[3]
  }
} );

promise.then( function handleResponse( responseObject ){
  console.log(responseObject.status );

  if (responseObject.status > 199 && responseObject.status < 300){
    // in here I know the resquest was succssful

    responseObject.json().then( function printData(myUserData) {
      console.log( myUserData.name, myUserData.location );
    } );  //text json

  } else {
    // This is if their is a problem, we output to the user
    console.log( 'There was a problem', responseObject.status );
  }


} );









// fetch number 2: get the repos
let promise2 = fetch(
  'https://api.github.com/users/'+ process.argv[2] +'/repos',
  {
    method: 'GET',
    headers: {
      Authorization: 'token ' + process.argv[3]
    }
  } );

  promise2.then( function handleResponse( responseObject ){
    console.log(responseObject.status );

    if (responseObject.status > 199 && responseObject.status < 300){
      // in here I know the resquest was succssful


      responseObject.json().then( function printData(repoData) {
        let maxStarGazerMax = 0;
        let maxStarGazerFileName;
        let maxStarGazerUserName;
        let secondMaxStarGazerMax = 0 ;
        let secondMaxStarGazerFileName = 0 ;
        let secondMaxStarGazerUserName = 0 ;
        // console.log(repoData.length)
        repoData.forEach(function stargazerCount(repo) {
          // console.log(repo.stargazers_count);
          if (repo.stargazers_count > maxStarGazerMax) {
            maxStarGazerMax = repo.stargazers_count;
            maxStarGazerFileName = repo.name;
            maxStarGazerUserName = repo.owner.login;

          }

          if (repo.stargazers_count > secondMaxStarGazerMax && repo.stargazers_count < maxStarGazerMax) {
            secondMaxStarGazerMax = repo.stargazers_count;
            secondMaxStarGazerFileName = repo.name;
            secondMaxStarGazerUserName = repo.owner.login;
          }
        });

        console.log( 'maxStarGazerMax', maxStarGazerMax );
        console.log( 'maxStarGazerFileName', maxStarGazerFileName );
        console.log( 'maxStarGazerUserName', maxStarGazerUserName );

        console.log('secondMaxStarGazerMax', secondMaxStarGazerMax);
        console.log('secondMaxStarGazerFileName', secondMaxStarGazerFileName);
        console.log('secondMaxStarGazerUserName', secondMaxStarGazerUserName);


        //
        // repoData.forEach( function printData(row) {
        //     if (starGazercount [ row[9] ] > maxStarGazerMax) {
        //         starGazerMax = maxStarGazerMax;
        //     } else {
        //       return;
        //     }
        // } );  //text json
        //



      } );  //text json

    } else {
      // This is if their is a problem, we output to the user
      console.log( 'There was a problem', repoData.status );
    }


  } );
