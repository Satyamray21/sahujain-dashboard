import React, { useState } from 'react';
import {
    Grid,
    TextField,
    MenuItem,
    Typography,
    Divider,
    Stack,
    Box
} from '@mui/material';
import { School } from '@mui/icons-material';

const educationLevels = ['High School', 'Intermediate', 'Graduation'];
const boards = ['UP Board', 'CBSE', 'ICSE', 'Other'];
const scoreTypes = ['Percentage', 'CGPA'];

const AcademicInformation = () => {
    const [scores, setScores] = useState(
        educationLevels.map(() => ({
            type: 'Percentage',
            obtained: '',
            max: '',
            cgpa: '',
        }))
    );

    const handleScoreTypeChange = (index, value) => {
        const updated = [...scores];
        updated[index].type = value;
        setScores(updated);
    };

    const handleInputChange = (index, field, value) => {
        const updated = [...scores];
        updated[index][field] = value;

        // Auto-calculate percentage if marks are filled
        if (field === 'obtained' || field === 'max') {
            const obtained = parseFloat(updated[index].obtained || 0);
            const max = parseFloat(updated[index].max || 0);
            if (max > 0) {
                updated[index].percentage = ((obtained / max) * 100).toFixed(2);
            } else {
                updated[index].percentage = '';
            }
        }

        setScores(updated);
    };

    return (
        <>
            <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{
                    backgroundColor: '#c5cae9',
                    borderLeft: '6px solid #1a237e',
                    borderRadius: 1,
                    px: 2,
                    py: 1,
                    mb: 2,
                }}
            >
                <School sx={{ color: '#1a237e' }} />
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: 700,
                        color: '#1a237e',
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                    }}
                >
                    Academic Information
                </Typography>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {educationLevels.map((level, index) => (
                <Box key={index} sx={{ mb: 4 }}>
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 700,
                            fontSize: '1rem',
                            color: '#1a237e',
                            backgroundColor: '#e8eaf6',
                            px: 2,
                            py: 1,
                            borderRadius: 1,
                            mb: 2,
                            textTransform: 'uppercase',
                            letterSpacing: 0.5,
                        }}
                    >
                        {level}
                    </Typography>

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={`${level} Board`}
                                variant="outlined"
                                size="small"
                                select
                            >
                                {boards.map((board) => (
                                    <MenuItem key={board} value={board}>
                                        {board}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                fullWidth
                                label={`${level} Subject`}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                fullWidth
                                label="Year of Passing"
                                type="number"
                                variant="outlined"
                                size="small"
                            />
                        </Grid>

                        <Grid size={{ xs: 12, sm: 3 }}>
                            <TextField
                                select
                                fullWidth
                                label="Score Type"
                                value={scores[index].type}
                                onChange={(e) => handleScoreTypeChange(index, e.target.value)}
                                size="small"
                            >
                                {scoreTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {scores[index].type === 'Percentage' ? (
                            <>
                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Marks Obtained"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={scores[index].obtained}
                                        onChange={(e) =>
                                            handleInputChange(index, 'obtained', e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Maximum Marks"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        value={scores[index].max}
                                        onChange={(e) =>
                                            handleInputChange(index, 'max', e.target.value)
                                        }
                                    />
                                </Grid>

                                <Grid size={{ xs: 12, sm: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Percentage"
                                        variant="outlined"
                                        size="small"
                                        value={scores[index].percentage || ''}
                                        InputProps={{
                                            readOnly: true,
                                        }}
                                    />
                                </Grid>
                            </>
                        ) : (
                            <Grid size={{ xs: 12, sm: 3 }}>
                                <TextField
                                    fullWidth
                                    label="CGPA"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    value={scores[index].cgpa}
                                    onChange={(e) =>
                                        handleInputChange(index, 'cgpa', e.target.value)
                                    }
                                />
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ))}
            <Box textAlign="center" mt={4}>
                <button
                    style={{
                        backgroundColor: '#1a237e',
                        color: '#fff',
                        padding: '10px 30px',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '16px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                    }}
                    onClick={() => {
                        console.log('Save clicked:', scores);
                    }}
                >
                    Save & Changes
                </button>
            </Box>
        </>
    );
};

export default AcademicInformation;
