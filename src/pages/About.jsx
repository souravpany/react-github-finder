function About() {
    return (
      <>
        <h1 className='text-6xl mb-4'>Github Finder</h1>
        <p className='mb-4 text-2xl font-light'>
          A React app to search GitHub profiles and see profile details.
          Source code can be found in my github account - 
          <strong>
            <a href='https://github.com/souravpany'> Sourav Kumar Pany</a>
          </strong>
          .
        </p>
        <p className='text-lg text-gray-400'>
          Version <span className='text-white'>1.0.0</span>
        </p>
        <p className='text-lg text-gray-400'>
          Layout By: 
          <a className='text-white' href='https://twitter.com/hassibmoddasser'>
            Hassib Moddasser
          </a>
        </p>
      </>
    )
  }
  
  export default About