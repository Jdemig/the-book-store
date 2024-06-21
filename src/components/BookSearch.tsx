import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { debounce } from 'lodash';
import { Book } from '@/stores/BookStore';
import AddIcon from '@mui/icons-material/Add';


const API_URL = process.env.NEXT_PUBLIC_BOOK_API_URL;

export type BookSearchPropTypes = {
    handleAddBook: (newBook: Book) => void
};

export default function BookSearch({ handleAddBook }: BookSearchPropTypes) {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [bookResults, setBookResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    const fetchBooks = debounce((searchString: string) => {
        axios.get(`${API_URL}?q=${encodeURIComponent(searchString)}&limit=6`)
            .then((res) => {
                setBookResults(res.data.docs);
            });
    }, 500);

    const handleBookSearch = (e: any) => {
        const value = e.target.value;

        setSearchInput(value);

        fetchBooks(value);
    }

    const handleOnBlur = () => {
        setIsDropdownVisible(false);
    }

    const handleOnFocus = () => {
        setIsDropdownVisible(true);
    }

    const handleMouseDown = (book: Book) => {
        setSearchInput('');
        setBookResults([]);
        handleAddBook(book)
        setIsDropdownVisible(false);
    }

    const isVisible = isDropdownVisible && !!bookResults.length;

    return (
        <Box sx={{ position: 'relative', width: '400px', display: 'flex', flexDirection: 'column' }}>
            <TextField
                hiddenLabel
                variant="outlined"
                size="small"
                value={searchInput}
                onChange={handleBookSearch}
                onBlur={handleOnBlur}
                onFocus={handleOnFocus}
                placeholder="Search for books..."
                sx={{ borderColor: 'grey.300' }}
            />
            {isVisible && (
                <Box sx={{ boxShadow: '1px solid grey', position: 'absolute', zIndex: 10, top: '48px', width: '100%', background: 'white', border: '1px solid', borderColor: 'grey.300', borderRadius: '6px', mt: 1, py: '8px' }}>
                    {bookResults.filter((bookResult: any) => bookResult?.author_name?.length).map((bookResult: any, idx) => (
                        <Button key={idx} sx={{ display: 'flex', alignItems: 'center', width: '100%', textTransform: 'none', textAlign: 'left', px: '14px', py: 1 }} onMouseDown={() => handleMouseDown(bookResult)}>
                            <AddIcon sx={{ mr: 1, mb: '2px' }} />
                            <Typography sx={{ color: 'black', textAlign: 'left', width: '100%' }}>
                                {bookResult.title} by {bookResult.author_name[0]}
                            </Typography>
                        </Button>
                    ))}
                </Box>
            )}
        </Box>
    );
};