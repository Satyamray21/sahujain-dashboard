import React, { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Chip,
    OutlinedInput,
    FormHelperText,
    Paper,
    Stack,
    Fade,
    Button,
    Alert,
    ToggleButton,
    ToggleButtonGroup,
    Grid
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const majorSubjectsList = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
const minorSubjectsList = ['Physical Education', 'Music', 'Art', 'Economics'];

const SelectSubject = () => {
    const [session, setSession] = useState('2025-2026');
    const [selectedClass, setSelectedClass] = useState('');
    const [semester, setSemester] = useState('');

    const [selectionType, setSelectionType] = useState('');
    const [majorSubjects, setMajorSubjects] = useState([]);
    const [minorSubject, setMinorSubject] = useState('');
    const [errorMajor, setErrorMajor] = useState(false);
    const [errorMinor, setErrorMinor] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSelectionTypeChange = (_, newType) => {
        setSelectionType(newType);
        setMajorSubjects([]);
        setMinorSubject('');
        setErrorMajor(false);
        setErrorMinor(false);
        setSubmitted(false);
    };

    const handleMajorChange = (event) => {
        const { value } = event.target;
        if (value.length <= 2) {
            setMajorSubjects(typeof value === 'string' ? value.split(',') : value);
            setErrorMajor(value.length === 0);
        }
    };

    const handleMinorChange = (event) => {
        const value = event.target.value;
        setMinorSubject(value);
        setErrorMinor(value === '');
    };

    const handleSubmit = () => {
        const isMajorValid = selectionType === 'major' && majorSubjects.length >= 1 && majorSubjects.length <= 2;
        const isMinorValid = selectionType === 'minor' && minorSubject !== '';

        setErrorMajor(selectionType === 'major' && !isMajorValid);
        setErrorMinor(selectionType === 'minor' && !isMinorValid);

        if ((selectionType === 'major' && isMajorValid) || (selectionType === 'minor' && isMinorValid)) {
            setSubmitted(true);
            console.log('Session:', session);
            console.log('Class:', selectedClass);
            console.log('Semester:', semester);
            console.log('Major Subjects:', majorSubjects);
            console.log('Minor Subject:', minorSubject);
        } else {
            setSubmitted(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                p: 2
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    borderRadius: 4,
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    transition: '0.3s ease'
                }}
            >
                <Typography
                    variant="h4"
                    fontWeight={700}
                    textAlign="center"
                    mb={4}
                    sx={{ color: '#1a237e' }}
                >
                    🎯 Select Your Subject
                </Typography>
                <Grid container spacing={2}>
                    {/* Session */}
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Academic Session</InputLabel>
                            <Select value={session} label="Academic Session" disabled>
                                <MenuItem value="2025-2026">2025-2026</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    {/* Class Dropdown */}
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Apply for Class</InputLabel>
                            <Select
                                value={selectedClass}
                                onChange={(e) => setSelectedClass(e.target.value)}
                                label="Apply for Class"
                            >
                                {/* <MenuItem value="11">Class 11</MenuItem>
                                <MenuItem value="12">Class 12</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Semester Dropdown */}
                    <Grid item size={{ xs: 12, sm: 4 }}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Select Semester</InputLabel>
                            <Select
                                value={semester}
                                onChange={(e) => setSemester(e.target.value)}
                                label="Select Semester"
                            >
                                {/* <MenuItem value="1">Semester 1</MenuItem>
                                <MenuItem value="2">Semester 2</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                {/* Toggle Major / Minor */}
                <Box textAlign="center" mt={3} mb={2}>
                    <ToggleButtonGroup
                        value={selectionType}
                        exclusive
                        onChange={handleSelectionTypeChange}
                        sx={{
                            borderRadius: 2,
                            border: '1px solid #ccc',
                            backgroundColor: '#fafafa'
                        }}
                    >
                        <ToggleButton
                            value="major"
                            sx={{
                                fontWeight: 600,
                                px: 4,
                                '&.Mui-selected': {
                                    backgroundColor: '#1976d2',
                                    color: 'white'
                                }
                            }}
                        >
                            Major
                        </ToggleButton>
                        <ToggleButton
                            value="minor"
                            sx={{
                                fontWeight: 600,
                                px: 4,
                                '&.Mui-selected': {
                                    backgroundColor: '#0288d1',
                                    color: 'white'
                                }
                            }}
                        >
                            Minor
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>

                {/* Major Subjects */}
                {selectionType === 'major' && (
                    <FormControl fullWidth error={errorMajor} margin="normal">
                        <InputLabel>Major Subjects (Max 2)</InputLabel>
                        <Select
                            multiple
                            value={majorSubjects}
                            onChange={handleMajorChange}
                            input={<OutlinedInput label="Major Subjects (Max 2)" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip
                                            key={value}
                                            label={value}
                                            icon={<SchoolIcon fontSize="small" />}
                                            size="small"
                                            sx={{ bgcolor: '#3f51b5', color: 'white' }}
                                        />
                                    ))}
                                </Box>
                            )}
                        >
                            {majorSubjectsList.map((subject) => (
                                <MenuItem
                                    key={subject}
                                    value={subject}
                                    disabled={majorSubjects.length >= 2 && !majorSubjects.includes(subject)}
                                >
                                    {subject}
                                </MenuItem>
                            ))}
                        </Select>
                        {errorMajor && (
                            <FormHelperText>Select 1 or 2 major subjects</FormHelperText>
                        )}
                    </FormControl>
                )}

                {/* Minor Subject */}
                {selectionType === 'minor' && (
                    <FormControl fullWidth error={errorMinor} margin="normal">
                        <InputLabel>Minor Subject</InputLabel>
                        <Select
                            value={minorSubject}
                            onChange={handleMinorChange}
                            label="Minor Subject"
                        >
                            {minorSubjectsList.map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                    {subject}
                                </MenuItem>
                            ))}
                        </Select>
                        {errorMinor && (
                            <FormHelperText>Select 1 minor subject</FormHelperText>
                        )}
                    </FormControl>
                )}

                {/* Display selected subjects */}
                {(majorSubjects.length > 0 || minorSubject) && (
                    <Box mt={3}>
                        <Typography variant="subtitle1" fontWeight={600} mb={1}>
                            Your Selection:
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {selectionType === 'major' &&
                                majorSubjects.map((subject) => (
                                    <Chip
                                        key={subject}
                                        label={`Major: ${subject}`}
                                        icon={<SchoolIcon fontSize="small" />}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            {selectionType === 'minor' && minorSubject && (
                                <Chip
                                    label={`Minor: ${minorSubject}`}
                                    icon={<EmojiObjectsIcon fontSize="small" />}
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        </Stack>
                    </Box>
                )}

                {/* Submit Button */}
                {selectionType && (
                    <Box mt={4} textAlign="center">
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
                            sx={{
                                textTransform: 'none',
                                px: 5,
                                py: 1.5,
                                fontWeight: 600,
                                borderRadius: 3,
                                backgroundColor: '#1565c0',
                                ':hover': {
                                    backgroundColor: '#0d47a1'
                                }
                            }}
                        >
                            Save & Continue
                        </Button>
                    </Box>
                )}

                {/* Success Message */}
                {submitted && (
                    <Fade in={submitted}>
                        <Alert
                            icon={<CheckCircleIcon fontSize="inherit" />}
                            severity="success"
                            sx={{ mt: 4 }}
                        >
                            Subjects submitted successfully!
                        </Alert>
                    </Fade>
                )}
            </Paper>
        </Box >
    );
};

export default SelectSubject;
