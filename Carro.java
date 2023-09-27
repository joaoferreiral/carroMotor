public class Carro {
    private String placa;
    private String cor;
    private String modelo;
    private Motor motor;

    public Carro(String placa, String modelo, Motor motor) {
        this.placa = placa;
        this.cor = "Prata";
        this.modelo = modelo;
        this.motor = motor;
    }

    public String getPlaca() {
        return placa;
    }
    public void setCor(String cor) {
        this.cor = cor;
    }
    public String getCor() {
        return cor;
    }
    public String getModelo() {
        return modelo;
    }
    public Motor getMotor(){
        return motor;
    }
    public void setModelo() {
        this.modelo = modelo;
    }
    public void setMotor(){
        this.motor = motor;
    }

    public void pintura(String cor) {
        this.cor = cor;
    }
    public boolean ligarMotor(){
        if (this.motor.getStatusMotor() == false) {
            motor.setStatusMotor(true);
            return true;
        } else {
            return false;
        }
    }
    public boolean desligarMotor(){
        if (this.motor.getStatusMotor() == true) {
            motor.setStatusMotor(false);
            return true;
        } else {
            return false;
        }
    }
}
