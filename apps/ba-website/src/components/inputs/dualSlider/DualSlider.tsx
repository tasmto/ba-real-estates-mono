import { Slider, SliderThumb } from '@mui/material';
import { styled } from '@mui/material/styles';

export const DualSlider = styled(Slider)(({ theme, slots = { thumb: DualThumbComponent } }) => ({
    color: '#3a8589',
    height: 8,
    padding: '13px 0',
    '& .MuiSlider-thumb': {
        height: 27,
        width: 27,
        backgroundColor: '#fff',
        border: '1px solid currentColor',
        '&:hover': {
            boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
        },
        '& .ba-bar': {
            height: 9,
            width: 1,
            backgroundColor: 'currentColor',
            marginLeft: 1,
            marginRight: 1,
        },
    },
    '& .MuiSlider-track': {
        height: 8,
    },
    '& .MuiSlider-rail': {
        color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
        opacity: theme.palette.mode === 'dark' ? undefined : 1,
        height: 10,
    },
}));

interface DualThumbComponentProps extends React.HTMLAttributes<unknown> { }

interface DualThumbComponentProps extends React.HTMLAttributes<unknown> { }

export const DualThumbComponent = (props: DualThumbComponentProps) => {
    const { children, ...other } = props;
    return (
        <SliderThumb {...other}>
            {children}
            <span className='ba-bar' />
            <span className='ba-bar' />
            <span className='ba-bar' />
        </SliderThumb>
    );
}