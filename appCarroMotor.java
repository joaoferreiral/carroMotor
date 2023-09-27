import java.util.Scanner;
public class appCarroMotor {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Motor meuMotor = new Motor(69, 840, true);
        Carro meuCarro = new Carro("BCT-6969", "Nivus", meuMotor);

        System.out.println("*******************************");
        System.out.println("Cor: " + meuCarro.getCor());
        System.out.println("Placa: " + meuCarro.getPlaca());
        System.out.println("Modelo: " + meuCarro.getModelo());
        System.out.println("*******************************");

        System.out.println("******* Funilaria *******");
        meuCarro.setCor("VerdeCristal");
        System.out.println("Nova Cor: " + meuCarro.getCor());

        System.out.println("******* Ligando Motor *******");
        System.out.println(meuCarro.desligarMotor());
        System.out.println(meuCarro.ligarMotor());
        System.out.println(meuCarro.ligarMotor());
        System.out.println(meuCarro.desligarMotor());
    }
}