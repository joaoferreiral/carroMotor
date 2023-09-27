public class Motor {
    private int id;
    private int potencia;
    private boolean statusMotor;

    public Motor(int id, int potencia, boolean statusMotor) {
        this.id = id;
        this.potencia = potencia;
        this.statusMotor = false;
    }
    public int getId() {
        return id;
    }
    public int getPotencia() {
        return potencia;
    }
    public boolean getStatusMotor() {
        return statusMotor;
    }
    public void setPotencia() {
        this.potencia = potencia;
    }
    public void setStatusMotor(boolean statusMotor){
        this.statusMotor = statusMotor;
    }
}
