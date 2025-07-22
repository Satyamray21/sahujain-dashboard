import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { submitSubjectInfo } from '../../features/personalInfo/personalInfoSlice';

const subjectOptions = {
  BA: {
    major: ['History', 'Political Science', 'Sociology', 'Geography', 'Economics'],
    minor: ['Hindi', 'English', 'Sanskrit', 'Philosophy'],
  },
  BCom: {
    major: ['Accountancy', 'Business Studies', 'Economics'],
    minor: ['Mathematics', 'Statistics', 'English'],
  },
  BSc: {
    major: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
    minor: ['Environmental Science', 'English', 'Statistics'],
  },
};

const courseOptions = Object.keys(subjectOptions);

const SubjectInfoForm = () => {
  const dispatch = useDispatch();
  const [course, setCourse] = useState('');
  const [majorSubject, setMajorSubject] = useState('');
  const [minorSubject, setMinorSubject] = useState('');
  const [error, setError] = useState('');

  const { loading, error: submitError, success } = useSelector(
    (state) => state.subjectInfo || {}
  );

  const handleSubmit = () => {
    if (!course || !majorSubject || !minorSubject) {
      setError('Please select all fields');
      return;
    }
    if (majorSubject === minorSubject) {
      setError('Major and Minor subjects cannot be the same');
      return;
    }
    setError('');
    dispatch(submitSubjectInfo({ course, majorSubject, minorSubject }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" mb={2}>
        Subject Information
      </Typography>

      <Stack spacing={2}>
        {/* Course Select */}
        <FormControl fullWidth>
          <InputLabel id="course-label">Select Course</InputLabel>
          <Select
            labelId="course-label"
            id="course"
            value={course}
            label="Select Course"
            onChange={(e) => {
              setCourse(e.target.value);
              setMajorSubject('');
              setMinorSubject('');
              setError('');
            }}
          >
            {courseOptions.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Major Subject */}
        {course && (
          <FormControl fullWidth>
            <InputLabel id="major-label">Major Subject</InputLabel>
            <Select
              labelId="major-label"
              id="majorSubject"
              value={majorSubject}
              label="Major Subject"
              onChange={(e) => setMajorSubject(e.target.value)}
            >
              {subjectOptions[course].major.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Minor Subject */}
        {course && (
          <FormControl fullWidth>
            <InputLabel id="minor-label">Minor Subject</InputLabel>
            <Select
              labelId="minor-label"
              id="minorSubject"
              value={minorSubject}
              label="Minor Subject"
              onChange={(e) => setMinorSubject(e.target.value)}
            >
              {subjectOptions[course].minor.map((subject) => (
                <MenuItem key={subject} value={subject}>
                  {subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Error / Success Messages */}
        {error && <Typography color="error">{error}</Typography>}
        {submitError && <Typography color="error">{submitError}</Typography>}
        {success && <Typography color="green">Subject info submitted!</Typography>}

        {/* Submit Button */}
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Submit'}
        </Button>
      </Stack>
    </Box>
  );
};

export default SubjectInfoForm;
