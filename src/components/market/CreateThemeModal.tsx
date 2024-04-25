import { Button, Card, TextField } from '@mui/material';

interface CreateProps {}

const CreateThemeModal: React.FC<CreateProps> = () => {
  return (
    <div className="modal">
      <Card
        sx={{
          width: '75vw',
          zIndex: 500,
          maxHeight: '65vh',
          overflowY: 'auto',
          display: 'flex', 
          alignItems: 'center',
          flexDirection: 'column'
        }}
      >
        <TextField
          label="Name:*"
          variant="outlined"
          fullWidth
          margin="normal"
          //   value={username}
          //   onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Description:"
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          //   value={username}
          //   onChange={(e) => setUsername(e.target.value)}
        />

        <div style={{width: '500px'}}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
        >
          login
        </Button>
        </div>
      </Card>
    </div>
  );
};

export default CreateThemeModal;
