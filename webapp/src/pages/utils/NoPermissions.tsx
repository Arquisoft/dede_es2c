import { Card, CardContent, Container, Stack, Button } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const NoPermissions = () => {

    function metodo() {
        localStorage.clear();
        window.location.assign("/login");
    }

    return (
        <div className='NoPermissions' style={{  display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
            <Container component= "main" maxWidth="sm" fixed={true} sx={{position: "center",top: 150}}> 
                <Card className={"main"} elevation={10} style={{display: "grid"}}> 
                    <CardContent style={{display: "flex", textAlign: "center", margin: "auto", justifyContent: 'center', alignItems: 'center'}}> 
                        <Stack direction= "column" spacing={2} textAlign = "center">
                            <div>
                                <WarningAmberIcon sx={{ fontSize: 60, textAlign: "center", justifyContent: 'center', alignItems: 'center'}}/>
                            </div>
                            <p>No dispone de los permisos necesarios para acceder a la ruta introducida</p>
                            <p>Por favor cierre sesión e intentelo de nuevo</p>
                            <Button onClick={() => metodo()}>Cerrar Sesión Actual e Iniciar Sesión</Button>
                        </Stack>
                    </CardContent>            
                </Card>
            </Container>
        </div>
    );
}

export default NoPermissions; 