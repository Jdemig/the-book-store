'use client';

import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { NAV_HEIGHT } from '@/constants';
import BookSearch from '@/components/BookSearch';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useRootStore } from '@/stores/react';
import { observer } from 'mobx-react';
import { BookStatus } from '@/stores/BookStore';



function MyLibrary() {
  const { bookStore } = useRootStore();

  const myBooks = bookStore.getBooksAsList();

  useEffect(() => {
    // if a user switches browsers they will no longer have access to their book list
    // it would be better to hit an api which stores the users books but i didn't want to set up a database in aws because it costs $$$
    const books = JSON.parse(localStorage.getItem('books') ?? 'null') ?? {};
    bookStore.setBooks(books);
  }, [bookStore]);
  
  return (
    <Grid container component="main" sx={{ minHeight: '100vh', pt: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <BookSearch handleAddBook={bookStore.addBook} />

        <Box sx={{ mt: 2, mb: 2, width: 400 }}>
          {myBooks.length > 0 ? (
            <>
              {myBooks.map((book: any, idx) => (
                <Box key={idx} sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1, border: '1px solid', borderColor: 'grey.300', mb: 1, borderRadius: '6px', px: 1 }}>
                  <Box sx={{ display: 'flex' }}>
                    <Typography sx={{ mr: 1 }}>📕</Typography>
                    <Box>
                      <Typography sx={{ color: 'black' }}><strong>Title: </strong>{book.title}</Typography>
                      <Typography sx={{ color: 'black' }}><strong>Author: </strong>{book.author_name[0]}</Typography>
                      <Typography sx={{ color: 'black' }}><strong>Genre: </strong>{book.subject.toSpliced(3).join(', ')}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl sx={{ m: 1, minWidth: 120, ml: 0, mr: 2, mt: 2 }} size="small">
                          <InputLabel id="select-small-label">Status</InputLabel>
                          <Select
                            labelId="select-small-label"
                            id="select-small"
                            value={book.status}
                            label="Status"
                            onChange={(e) => bookStore.updateBook(book, 'status', e.target.value)}
                          >
                            <MenuItem value={BookStatus.Unread}>Unread</MenuItem>
                            <MenuItem value={BookStatus.Read}>Read</MenuItem>
                          </Select>
                        </FormControl>
                        <Button variant="contained" onClick={() => bookStore.deleteBook(book)} sx={{ display: 'flex', alignItems: 'center', mt: '5px', py: '7px' }}>
                          <DeleteIcon sx={{ color: 'white', mr: 1, width: '20px' }} />
                          <Typography sx={{ textTransform: 'none', mt: '2px' }}>Delete</Typography>
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </>
          ) : (
            <>
              <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', py: 4, border: '1px solid', borderColor: 'grey.300', mb: 1, borderRadius: '6px', px: 1 }}>
                <Typography variant="h6" sx={{ color: 'black', textAlign: 'center', width: '100%' }}>No books in your library</Typography>
                <Typography sx={{ color: 'grey', textAlign: 'center', width: '100%' }}>Search and click to add</Typography>
              </Box>
            </>
          )}
        </Box>
    </Grid>
  );
};

export default observer(MyLibrary);
