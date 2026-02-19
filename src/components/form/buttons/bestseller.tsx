
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Bestseller: React.FC = () => {

	return (
		<Box
			sx={{
				bgcolor: '#5b5b5b',
				color: '#fff',
                height: "13px",
                width: "65px",
				borderRadius: "2px",
				textAlign: 'center',
                verticalAlign: 'middle',
			}}
		>
			<Typography sx={{ fontWeight: 700, fontSize: "9px" }}>
				BESTSELLER
			</Typography>
		</Box>
	);
};

export default Bestseller;
