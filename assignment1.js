const { createReadStream, appendFile, existsSync } = require('fs');

function readStream(stream) {
    return new Promise((resolve, reject) => {
        let data = [];        
        stream.on("data", chunk => data.push(...chunk.split(/\r\n/).map((line) =>line.split(';'))));
        stream.on("end", () => {
            const header = data.shift();
            data = data.map(d=>{    // converting into array of objects
                const obj={};
                header.forEach((h,index)=> obj[h] = d[index]);
                return obj;
            })
            resolve(data);
        });
        stream.on("error", error => reject(error));
    });
}
const makeAuthorArray = data=>{
    return data.map(d=>{
        d.authors = d.authors.split(',')
        return d;
       });
}

const printAllBooksandMagazines = async () => {
    try{
        const data = await Promise.all([
            readStream(createReadStream('./data/books.csv', { encoding: 'utf8' })),
            readStream(createReadStream('./data/magazines.csv', { encoding: 'utf8' }))
         ]);
         if(!data.length){
            throw new Error('No data found');
         }
      
         console.log('All Books');
         const books = makeAuthorArray(data[0])
         console.log(books);
         console.log('All Magazines');
         const magazines = makeAuthorArray(data[1])
         console.table(magazines);
    }catch (err) {
        console.log(err);
    }
};


const findBookOrMagazineByISBN = async (isbn) => {
    try{
        const allData = await Promise.all([
            readStream(createReadStream('./data/books.csv', { encoding: 'utf8' })),
            readStream(createReadStream('./data/magazines.csv', { encoding: 'utf8' }))
         ]);
         if(!allData.length){
            throw new Error('No data found');
         }
         const data = [...allData[0], ...allData[1]].find(d=> d.isbn === isbn);
         console.log(data)
    }catch (err) {
        console.log(err);
    }
};

const findAllBooksAndMagazinesByEmail = async(email) => {
    try{
        let allData = await Promise.all([
            readStream(createReadStream('./data/books.csv', { encoding: 'utf8' })),
            readStream(createReadStream('./data/magazines.csv', { encoding: 'utf8' }))
         ]);
         if(!allData.length){
            throw new Error('No data found');
         }
        allData = makeAuthorArray([...allData[0], ...allData[1]]);
     
        const allBooksAndMagazines = allData.filter(b=> b.authors.includes(email));
        console.log(allBooksAndMagazines);
    }catch (err) {
        console.log(err);
    }
}

const printAllBooksAndMagazineSortedByTitle = async() => {
    try{
        let allData = await Promise.all([
            readStream(createReadStream('./data/books.csv', { encoding: 'utf8' })),
            readStream(createReadStream('./data/magazines.csv', { encoding: 'utf8' }))
        ]);
        if(!allData.length){
            throw new Error('No data found');
         }
    
        allData = makeAuthorArray([...allData[0], ...allData[1]]);
         const titles = allData.map(d => d.title).sort();
         const sortedData = titles.map(t => {
            const data = allData.find(d => d.title === t);
            return data;
         })
        console.log(sortedData);
    }catch (err){
     console.log(err);
    }
}

const addNewBookOrMagazine = (fileName, objData)=>{
    const path = `./data/${fileName}.csv`
    const csvData = `${objData.title};${objData.isbn};${objData.authors};${objData.description}\n`;
    
    if (existsSync(path)) {
        appendFile(path, csvData, (err)=>{
            if(err) console.log(err);
            console.log('File data written successfully');
        });
      } else {
        let csvHeader='';
        const keys = Object.keys(objData);
        keys.forEach((k, index)=>{
            if(index< keys.length-1){
                csvHeader = `${csvHeader}${k};`
            }else{
                csvHeader = `${csvHeader}${k}\n`
            }  
        });
        //appending header first if it is new file
        appendFile(path, csvHeader, (err)=>{
            if(err) console.log(err);
            console.log('File header written successfully');

            appendFile(path, csvData, (err)=>{
                if(err) console.log(err);
                console.log('File data written successfully');
            });
        });
        
      }
}


// all function call
const bookData = {
    title: 'The sunset', 
    isbn: '55442-6662-98', 
    authors: 'ahhshs,hdhhs,jjqjd', 
    description: 'jedke kqehdqdeh kqehoqh'
};

readStream(createReadStream('./data/books.csv', { encoding: 'utf8' })).then(data => {
    console.log(data);
});
printAllBooksandMagazines();
findBookOrMagazineByISBN('5454-5587-3210')
findAllBooksAndMagazinesByEmail('null-walter@echocat.org');
printAllBooksAndMagazineSortedByTitle();
addNewBookOrMagazine('newBook1', bookData);